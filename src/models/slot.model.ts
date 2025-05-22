import mongoose, {Schema, Document} from "mongoose";
import {ISlot} from "../types/slot.types";

export interface ISlotDocument extends ISlot, Document {}

const slotSchema = new Schema<ISlotDocument>(
  {
    coachId: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    state: { type: String, enum: ["available", "cancelled", "finished", "inprogress"], default: "available" },
  },
  { timestamps: true }
);

const Slot = mongoose.model<ISlotDocument>("Slot", slotSchema);
export default Slot;