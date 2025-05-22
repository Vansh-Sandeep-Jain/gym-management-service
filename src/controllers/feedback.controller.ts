import { Request, Response } from "express";
import { IClientFeedback } from "../types/clientFeedback.types";
import { error } from "console";
import * as FeedbackService from "../services/feedback.service";
import { ICoachFeedback } from "../types/coachFeedback.types";
interface AuthReq extends Request {
  user?: any;
}

export const createCoachFeedback = async (
  req: AuthReq,
  res: Response,
): Promise<void> => {
  try {
    const { slotId } = req.params;
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ message: "Feedback message is required" });
      return;
    }

    const feedbackData: ICoachFeedback = {
      slotId,
      message,
    };
    const feedback = await FeedbackService.createCoachFeedback(feedbackData);
    res.status(201).json({ success: true, feedback });
  } catch (error: any) {
    console.error("Error creating coach feedback : ", error);
    res.status(500).json({
      message: "Failed to create coach feedback",
      error: error.message,
    });
  }
};

export const createClientFeedback = async (
  req: AuthReq,
  res: Response,
): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const { message, rating } = req.body;
    if (!message) {
      res.status(400).json({ message: "Feedback message is required" });
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({ message: "Rating must be between 1 and 5" });
      return;
    }

    const feedbackData: IClientFeedback = {
      bookingId,
      message,
      rating,
    };
    const feedback = await FeedbackService.createClientFeedback(feedbackData);
    res.status(201).json({ success: true, feedback });
  } catch (error: any) {
    console.error("Error creating feedback: ", error);
    res.status(500).json({
      message: "Failed to create client feedback",
      error: error.message,
    });
  }
};
