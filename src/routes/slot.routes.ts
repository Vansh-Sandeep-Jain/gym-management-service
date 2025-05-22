import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { cancelSlot, createSlot } from "../controllers/slot.controller";

const router = Router();

router.post("/", authenticate, authorize("admin"), createSlot); // create a new slot
router.patch("/cancel/:slotId", authenticate, authorize("coach"), cancelSlot); // cancel a slot



export default router;