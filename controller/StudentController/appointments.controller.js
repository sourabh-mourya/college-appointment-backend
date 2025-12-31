import getAppointments from "../../services/appointment.service.js";

const getStudentAppointments = async (req, res) => {
  try {
    const studentId = req.user._id;
    const role = req.user.role;
    const appointments = await getAppointments(studentId, role);
    if (!appointments.length) {
      return res.status(404).json({
        message: "No appointments found",
      });
    }

    return res.status(201).json({
      messaage: "Student appointment fetched successfully",
      appointments,
    });
  } catch (error) {
    console.log("Error in student appointment controller ");
    return res.status(500).json({
      messaage: "Internal server error",
    });
  }
};

export default getStudentAppointments;
