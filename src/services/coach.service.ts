import CoachFeedback from "../models/coachFeedback.model";
import Slot from "../models/slot.model";
import { getAllCoaches, getCoachesById } from "../utils/getCoach.util";

export const getCoaches = async () => {
  try {
    const coaches = await getAllCoaches();
    return coaches;
  } catch (error) {
    console.error("Failed to fetch coaches:", error);
    return [];
  }
};

export const getCoachById = async (coachId: string) => {
  try {
    const coach = await getCoachesById(coachId);
    if (!coach || Object.keys(coach).length === 0) {
      throw new Error("Coach not found");
    }
    return coach;
  } catch (error) {
    console.error("Failed to fetch coach:", error);
    throw error;
  }
};

export const getAvailableSlots = async (coachId: string, date: string) => {
  try {
    const coach = await getCoachesById(coachId);
    if (!coach || Object.keys(coach).length === 0) {
      throw new Error("Coach not found");
    }
    console.log(date);
    const slots = await Slot.find({ coachId: coachId, startDate: date });
    return slots;
  } catch (error) {
    console.error("Failed to fetch slots:", error);
    throw error;
  }
};

export const getCoachFeedbacks = async (coachId: string) => {
  try {
    // Fetch slots by coachId
    const slots = await Slot.find({ coachId });

    if (!slots.length) {
      throw new Error("No slots found for the given coach.");
    }

    const slotIds = slots.map((slot: any) => slot._id.toString());

    // Fetch feedbacks for the slots
    const feedbacks = await CoachFeedback.find({ slotId: { $in: slotIds } });

    return feedbacks;
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    throw error;
  }
};
