import Booking from "../models/booking.model";
import Slot from "../models/slot.model";
import { getCoachesById } from "../utils/getCoach.util";

interface WorkoutFilter {
  date?: string;
  startTime?: string;
  activity?: string;
  coachId?: string;
}

export const getAvailableWorkoutsService = async (filter: WorkoutFilter) => {
  const { date, startTime, activity, coachId } = filter;

  // Construct the query object
  const query: any = { state: "available" };

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    query.startDate = { $gte: startOfDay, $lte: endOfDay };
  }

  if (startTime) {
    query.startTime = new Date(startTime);
  }

  if (coachId) {
    query.coachId = coachId;
  }

  const slots = await Slot.find(query);

  // Extract unique coachIds to get coach information in one call
  const coachIds = [...new Set(slots.map((slot) => slot.coachId))];

  // Fetch coach details
  const coaches = await Promise.all(
    coachIds.map(async (id) => {
      try {
        const coach = await getCoachesById(id);
        return coach;
      } catch (error: any) {
        console.error(`Error fetching coach with ID ${id}: ${error.message}`);
        return null;
      }
    })
  );

  // Create a mapping of coachId to coach details
  const coachMap = coaches.reduce((acc: any, coach: any) => {
    if (coach) acc[coach._id] = coach;
    return acc;
  }, {});

  // Construct the response format
  const result = coachIds.map((id) => {
    const user = coachMap[id];

    const userSlots = slots
      .filter((slot) => slot.coachId === id)
      .map((slot) => ({
        slotId: slot._id,
        startDate: slot.startDate,
        endDate: slot.endDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
        state: slot.state,
        capacity: slot.capacity,
        createdAt: slot.createdAt,
        updatedAt: slot.updatedAt,
      }));

    const availableSlots = { ...user };
    availableSlots.slots = userSlots;

    // Filter by preferableActivity
    if (activity && availableSlots.preferableActivity !== activity) {
      return null;
    }

    return availableSlots;
  }).filter(Boolean);

  return result;
};

export const getBookedWorkoutsService = async (userId: string) => {
  const bookings = await Booking.find({ clientId: userId });

  if (!bookings.length) return [];

  // Extract slotIds
  const slotIds = bookings.map((booking) => booking.slotId);

  // Fetch corresponding slots
  const slots = await Slot.find({ _id: { $in: slotIds } });

  // Create a map for quick access
  const slotMap = slots.reduce((acc: any, slot:any) => {
    acc[slot._id] = slot;
    return acc;
  }, {});

  // Construct the response
  const result = bookings.map((booking) => {
    const slot = slotMap[booking.slotId];

    return {
      bookingId: booking._id,
      slotId: booking.slotId,
      clientId: booking.clientId,
      slot: slot ? {
        startDate: slot.startDate,
        endDate: slot.endDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
        state: slot.state,
        capacity: slot.capacity,
      } : null,
    };
  });

  return result;
};

export const bookWorkoutService = async (slotId: string, clientId: string) => {
  const slot = await Slot.findById(slotId);

  if (!slot) {
    throw new Error("Slot not found.");
  }

  if (slot.state !== "available") {
    throw new Error("Slot is not available.");
  }

  if (slot.capacity <= 0) {
    throw new Error("Slot is full.");
  }

  // Check for duplicate booking
  const existingBooking = await Booking.findOne({ slotId, clientId });

  if (existingBooking) {
    throw new Error("User has already booked this slot.");
  }

  // Create new booking
  const booking = new Booking({
    slotId,
    clientId,
  });

  // Decrease capacity
  slot.capacity -= 1;

  // Update state to "scheduled" if capacity is zero
  if (slot.capacity === 0) {
    slot.state = "scheduled";
  }

  await slot.save();
  return await booking.save();
};

export const cancelWorkoutService = async (
  bookingId: string,
  clientId: string,
) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (booking.clientId !== clientId) {
    throw new Error("Unauthorized to cancel this booking.");
  }

  const slot = await Slot.findById(booking.slotId);

  if (slot) {
    slot.capacity += 1;
    await slot.save();
  }

  return await Booking.findByIdAndDelete(bookingId);
};
