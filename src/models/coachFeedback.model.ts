import mongoose, {Schema, Document} from "mongoose";
import { ICoachFeedback } from "../types/coachFeedback.types";

export interface IFeedbackDocument extends ICoachFeedback, Document {}

const coachFeedbackSchema = new Schema<IFeedbackDocument>(
  {
    slotId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const CoachFeedback = mongoose.model<IFeedbackDocument>("CoachFeedback", coachFeedbackSchema);
export default CoachFeedback;