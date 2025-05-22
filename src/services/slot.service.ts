import Slot from "../models/slot.model";

export const createSlotService = async ({
  coachId,
  capacity,
  startDate,
  endDate,
  startTime,
  endTime,
}: {
  coachId: string;
  capacity: number;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
}) => {
  // Set start and end of the day to ensure date boundary check
  const startOfDay = new Date(startDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(startDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  // Check for duplicate slot
  const existingSlot = await Slot.findOne({
    coachId,
    startDate: { $gte: startOfDay, $lte: endOfDay },
    startTime,
    endTime,
  });

  if (existingSlot) {
    throw new Error(
      `A slot already exists for this coach with the same start and end time on the same day.`
    );
  }

  // Create new slot
  const slot = new Slot({
    coachId,
    capacity,
    startDate,
    endDate,
    startTime,
    endTime,
  });

  return await slot.save();
};


// Cancel a slot
export const cancelSlotService = async (slotId: string) => {
  const slot = await Slot.findById(slotId);

  if (!slot) {
    throw new Error("Slot not found.");
  }

  slot.state = "cancelled";
  return await slot.save();
};
