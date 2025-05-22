import { Request, Response } from "express";
import { createSlotService, cancelSlotService } from "../services/slot.service";

// Create a new slot
export const createSlot = async (req: Request, res: Response) => {
  const { coachId, capacity, startDate, endDate, startTime, endTime } = req.body;

  try {
    const slot = await createSlotService({
      coachId,
      capacity,
      startDate,
      endDate,
      startTime,
      endTime,
    });
    res.status(201).json(slot);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel a slot
export const cancelSlot = async (req: Request, res: Response) => {
  const { slotId } = req.params;

  try {
    const result = await cancelSlotService(slotId);
    res.status(200).json({ message: "Slot cancelled successfully", result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
