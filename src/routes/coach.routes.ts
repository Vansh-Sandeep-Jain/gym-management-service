import express, { RequestHandler } from "express";
import {
  getAvailableSlots,
  getCoachById,
  getCoachFeedbacks,
  getCoachList,
} from "../controllers/coach.controller";

const router = express.Router();

router.get("/", getCoachList as RequestHandler); // Get list of coaches
router.get("/:coachId", getCoachById as RequestHandler); // Get coach by ID
router.get(
  "/:coachId/available-slots/:date",
  getAvailableSlots as RequestHandler,
); // Get available slots for a coach on a specific date
router.get("/:coachId/feedbacks", getCoachFeedbacks as RequestHandler); // Get feedbacks for a coach

export default router;
