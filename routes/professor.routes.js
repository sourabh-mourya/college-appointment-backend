import express from "express"
import protectRoute from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import createAvailableTime from "../controller/ProfessorController/available_time.controller.js";
import cancelAppointment from "../controller/ProfessorController/cancel_appointments.controller.js";

const professorRouter=express.Router();
// Only the logged-in professor can create their own availability slots.
// Students are not allowed to create availability.

professorRouter.post('/create_availability_time',protectRoute,authorizeRoles('professor'),createAvailableTime);
professorRouter.post('/cancel_appointments/:id',protectRoute,authorizeRoles('professor'),cancelAppointment);

export default professorRouter; 