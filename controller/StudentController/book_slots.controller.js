import Appointment from "../../models/appointment.model.js";
import Availability from "../../models/availability.model.js";

const bookSlot = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { availabilityId } = req.params;
    console.log("student id :-", studentId);

    console.log("availablity id :-", availabilityId);
    // Check slot exists
    const slotExists = await Availability.findOne({
      _id: availabilityId,
      isBooked: false,
    });

    if (!slotExists) {
      return res.status(404).json({
        message: "Slot does not exist",
      });
    }

    if (slotExists.isBooked === true) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    //Create appointment
    const appointment = await Appointment.create({
      studentId,
      professorId: slotExists.professorId,
      availabilityId,
      status: "Booked",
    });

    slotExists.isBooked = true;
    await slotExists.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    console.log("Error in bookSlot controller:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default bookSlot;
