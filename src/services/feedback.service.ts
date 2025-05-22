import mongoose from "mongoose";
import Booking from "../models/booking.model";
import ClientFeedback from "../models/clientFeedback.model";
import CoachFeedback from "../models/coachFeedback.model";
import { IClientFeedback } from "../types/clientFeedback.types";
import { ICoachFeedback } from "../types/coachFeedback.types";
import Slot from "../models/slot.model";

export const createCoachFeedback=async (feedbackData:ICoachFeedback):Promise<ICoachFeedback>=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(feedbackData.slotId)) {
            throw new Error(`Invalid slot ID format: ${feedbackData.slotId}`);
        }
        const slotId= await Slot.findById(feedbackData.slotId);
        if(!slotId){
            throw new Error(`Slot with Id ${feedbackData.slotId} not found`);
        }
        const newFeedback=new CoachFeedback(feedbackData);
        return await newFeedback.save();
    }
    catch(error){
        console.error("Eror in createCoachFeedback service: ",error);
        throw error;
    }
}

export const createClientFeedback=async(feedbackData:IClientFeedback):Promise<IClientFeedback>=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(feedbackData.bookingId)) {
            throw new Error(`Invalid booking ID format: ${feedbackData.bookingId}`);
        }
        const booking=await Booking.findById(feedbackData.bookingId);
        if(!booking){
            throw new Error(`Booking with Id ${feedbackData.bookingId} not found`);
        }
        const newFeedback=new ClientFeedback(feedbackData);
        return await newFeedback.save();
    }
    catch(error){
        console.error("Eror in createClientFeedback service: ",error);
        throw error;

    }
}