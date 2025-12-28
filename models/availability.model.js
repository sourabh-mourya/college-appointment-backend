import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String, // e.g. "2025-01-05"
      required: true
    },
    startTime: {
      type: String, // "10:00"
      required: true
    },
    endTime: {
      type: String, // "10:30"
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability


/* 
isBooked-> false ka mtlb ki slot free hi
isBooked -> true ka mtlb ki slot free nhi hi 
*/ 
