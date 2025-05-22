import mongoose, {Schema, Document} from "mongoose";
import { IClientFeedback } from "../types/clientFeedback.types";

export interface IFeedbackDocument extends IClientFeedback, Document {}

const clientFeedbackSchema = new Schema<IFeedbackDocument>(
  {
    bookingId: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const ClientFeedback = mongoose.model<IFeedbackDocument>("ClientFeedback", clientFeedbackSchema);
export default ClientFeedback;