const Seat = require("../model/seat");

//get Seat

const GetSeats = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json("Id not found");
    }
    const data = await Seat.find({ stages_id: id }).sort({ no: "asc" });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetSeats };
