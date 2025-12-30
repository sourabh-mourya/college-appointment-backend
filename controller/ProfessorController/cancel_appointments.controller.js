import Appointment from "../../models/appointment.model.js";
import Availability from "../../models/availability.model.js";

const cancelAppointment = async (req, res) => {
  try {
    const professorId = req.user._id;
    const { appointmentId } = req.params;

    // 1. Check appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 2. Ensure appointment belongs to logged-in professor
    if (appointment.professorId.toString() !== professorId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 3. Mark appointment as cancelled
    appointment.status = "cancelled";
    await appointment.save();

    // 4. Free the slot again
    await Availability.findByIdAndUpdate(appointment._id, {
      isBooked: false,
    });

    return res.status(200).json({
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log("Cancel appointment error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default cancelAppointment;
