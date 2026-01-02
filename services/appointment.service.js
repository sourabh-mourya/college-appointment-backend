import Appointment from "../models/appointment.model.js";

const   getAppointments = async (userId, role) => {
  let filter = {};

  if (role === "student") {
    filter.studentId = userId;
  }

  if (role === "professor") {
    filter.professorId = userId;
  }

  const appointments = await Appointment.find(filter)
    .populate("studentId", "name email")
    .populate("professorId", "name email")
    .populate("availabilityId", "date startTime endTime")
    .sort({ createdAt: -1 });

  const formattedAppointments = appointments.map((appt) => ({
    studentName: appt.studentId?.name,
    professorName: appt.professorId?.name,
    date: appt.availabilityId?.date,
    startTime: appt.availabilityId?.startTime,
    endTime: appt.availabilityId?.endTime,
    status: appt.status,
  }));
  return formattedAppointments;
};

export default getAppointments;
