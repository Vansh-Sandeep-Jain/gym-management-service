import { Request, Response } from "express";
import {
  getAvailableWorkoutsService,
  getBookedWorkoutsService,
  bookWorkoutService,
  cancelWorkoutService,
} from "../services/workout.service";
import { AuthRequest } from "../types/authRequest.types";

export const getAvailableWorkouts = async (req: Request, res: Response) => {
  const { date, startTime, activity, coachId } = req.query;

  try {
    const workouts = await getAvailableWorkoutsService({
      date: date as string | undefined,
      startTime: startTime as string | undefined,
      activity: activity as string | undefined,
      coachId: coachId as string | undefined,
    });

    res.status(200).json(workouts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getBookedWorkouts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const workouts = await getBookedWorkoutsService(userId);
    res.status(200).json(workouts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const bookWorkout = async (req: AuthRequest, res: Response) => {
  const { slotId } = req.body;
  const clientId = req.user.userId;

  try {
    const booking = await bookWorkoutService(slotId, clientId);
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelWorkout = async (req: AuthRequest, res: Response) => {
  const { bookingId } = req.params;
  const clientId = req.user.userId;

  try {
    const result = await cancelWorkoutService(bookingId, clientId);
    res.status(200).json({ message: "Booking canceled successfully.", result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
