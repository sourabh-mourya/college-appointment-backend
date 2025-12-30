import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    meetingLink: {
      type: String,
      default: null,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Availability = mongoose.model("Availability", availabilitySchema);

availabilitySchema.index({ professorId: 1, date: 1, startTime: 1 });


//i added indexing for faster slot lookup
export default Availability;