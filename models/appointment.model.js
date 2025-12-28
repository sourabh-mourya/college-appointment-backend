import mongoose from "mongoose";
import User from "./user.model.js";

const appointmentSchema = new mongoose.Schema(
  {
    //appointment ke ander student id proferssor id hogi konsa student konse profesors ko book kr rha hi
    //ur ek availbity ka rhege ki uss proferssor ka available time kya hi
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    availabilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Cancelled"],
      default: "Booked",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
