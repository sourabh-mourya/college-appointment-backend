import Availability from "../../models/availability.model.js";

const createAvailableTime = async (req, res) => {
  try {
    const professorId = req.user._id;
    console.log("professorId :- ", professorId);

    const { date, startTime, endTime, meetingLink } = req.body;

    if (!date || !startTime || !endTime || !meetingLink) {
      return res.status(400).json({
        message: "All fields is required",
      });
    }

    //duplicate slot  Prevention -> same Date + time duplicate na ho
    //mtlb ki same professor same date ur time slot create na kr ske glti se bhi

    const exits = await Availability.findOne({
      professorId,
      date,
      startTime,
      endTime,
    });

    if (exits) {
      return res.status(400).json({
        message:
          "An availability slot has already been created for the specified date and time.",
      });
    }

    const availability = await Availability.create({
      professorId,
      date,
      startTime,
      endTime,
      meetingLink,
      isBooked: false,
    });

    return res.status(201).json({
      message: "Availablity is created",
      availability,
    });
  } catch (error) {
    console.log("Error in available time controller", error.message);
    return res.status(500).json({
      message: "Internal server error ",
    });
  }
};

export default createAvailableTime;
