import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { createClientFeedback,createCoachFeedback } from "../controllers/feedback.controller";
const router = Router();

router.post("/coach/:slotId", authenticate, authorize("coach"), createCoachFeedback); // create feedback for a coach
router.post("/client/:bookingId", authenticate, authorize("client"), createClientFeedback); // create feedback for a client

export default router;