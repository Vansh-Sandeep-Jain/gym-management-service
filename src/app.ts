import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import coachRoutes from "./routes/coach.routes";
import workoutRoutes from "./routes/workout.routes";
import feedbackRoutes from "./routes/feedback.routes";
import slotRoutes from "./routes/slot.routes";
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/coaches", coachRoutes);
app.use("/workouts", workoutRoutes);
app.use("/feedbacks", feedbackRoutes);
app.use("/slot", slotRoutes);


// 404 handler 
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
