import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import availableSlots from "../controller/StudentController/available_slots.controller.js";
import bookSlot from "../controller/StudentController/book_slots.controller.js";
import authorizeRoles from "../middleware/role.middleware.js";
import getStudentAppointments from "../controller/StudentController/appointments.controller.js";

const studentRouter = express.Router();

studentRouter.get("/available-slots", protectRoute, availableSlots);
studentRouter.post("/book-slot/:availabilityId", protectRoute, bookSlot);
studentRouter.get(
  "/appointments",
  protectRoute,
  authorizeRoles("student"),
  getStudentAppointments
);

export default studentRouter;
