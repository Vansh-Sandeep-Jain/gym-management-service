import { Request, Response } from "express";
import {
  getCoaches,
  getCoachById as fetchCoachById,
  getAvailableSlots as fetchAvailableSlots,
  getCoachFeedbacks as fetchCoachFeedbacks,
} from "../services/coach.service";

export const getCoachList = async (req: Request, res: Response) => {
  try {
    const coaches = await getCoaches();
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Coaches retrieved successfully",
      data: coaches,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error retrieving coaches",
      error: error,
    });
  }
};

export const getCoachById = async (req: Request, res: Response) => {
  try {
    const coach = await fetchCoachById(req.params.coachId);

    if (!coach) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Coach not found or user is not a coach",
      });
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Coach retrieved successfully",
      data: coach,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "User is not a coach") {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "User is not a coach",
      });
    }

    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error retrieving coach",
      error: error,
    });
  }
};

export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const slots = await fetchAvailableSlots(
      req.params.coachId,
      req.params.date,
    );
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Available slots retrieved successfully",
      data: slots,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Coach not found") {
        return res.status(404).json({
          statusCode: 404,
          success: false,
          message: "Coach not found",
        });
      } else if (error.message === "User is not a coach") {
        return res.status(400).json({
          statusCode: 400,
          success: false,
          message: "User is not a coach",
        });
      }
    }

    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error retrieving available slots",
      error: error,
    });
  }
};

export const getCoachFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await fetchCoachFeedbacks(req.params.coachId);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Feedbacks retrieved successfully",
      data: feedbacks,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Coach not found") {
        return res.status(404).json({
          statusCode: 404,
          success: false,
          message: "Coach not found",
        });
      } else if (error.message === "User is not a coach") {
        return res.status(400).json({
          statusCode: 400,
          success: false,
          message: "User is not a coach",
        });
      }
    }

    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error retrieving coach feedbacks",
      error: error,
    });
  }
};
