import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "../types/booking.types";

export interface IBookingDocument extends IBooking, Document {}

const bookingSchema = new Schema<IBookingDocument>(
  {
    slotId: { type: String, required: true },
    clientId: { type: String, required: true },
  },
  { timestamps: true },
);

const Booking = mongoose.model<IBookingDocument>("Booking", bookingSchema);
export default Booking;
