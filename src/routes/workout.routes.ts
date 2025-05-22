import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { bookWorkout, cancelWorkout, getAvailableWorkouts, getBookedWorkouts } from "../controllers/workout.controller";

const router = Router();

router.get("/", getAvailableWorkouts); // get available workouts
router.get("/booked/:userId", authenticate, authorize("client", "coach"), getBookedWorkouts); // get booked workouts for a user
router.post("/book", authenticate, authorize("client"), bookWorkout); // book a workout slot
router.delete("/cancel/:bookingId", authenticate, authorize("client"), cancelWorkout); // cancel a booked workout

export default router;