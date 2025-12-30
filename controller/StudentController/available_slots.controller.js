import Availability from "../../models/availability.model.js";

const availableSlots = async (req, res) => {
  try {
    const availableSlots = await Availability.find({ isBooked: false }); //jo jo booked nhi hui hi wo slots bata do j

    if (availableSlots.length === 0) {
      return res.status(404).json({
        message: "There is no slots available ",
      });
    }

    return res.status(200).json({
      message: "Available slots ",
      data: availableSlots,
    });
  } catch (error) {
    console.log("Error in available slots controller ");
    return res.status(500).json({
      message: "Internal server error ",
    });
  }
};

export default availableSlots;
