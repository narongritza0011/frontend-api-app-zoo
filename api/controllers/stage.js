const Stage = require("../model/stage");
const Seat = require("../model/seat");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
//get stages

const GetStages = async (req, res) => {
  try {
    const stages = await Stage.find();
    if (stages) {
      res.status(200).json(stages);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

//create stage and seats
const CreateStage = async (req, res) => {
  try {
    const { room, seat, amount } = req.body;
    //validate user input
    if (!(room && seat && amount)) {
      res.status(400).send("All input is required");
    }
    // console.log('body   ',req.body);

    const stageData = new Stage({
      room,
      seat,
      amount,
    });

    const stage = await Stage.create(stageData);

    //เอา Id จาก stages
    const parentId = new ObjectId(stageData._id);

    //loop array เอา ค่าที่จะเก็บใน stages
    const seats = Array.from({ length: seat }, (_, i) => ({
      no: i + 1,
      stage_id: parentId,
    }));

    //คือการเอา array มาสร้าง ในseats
    const savedSeats = await Promise.all(
      seats.map(async (seatData) => {
        try {
          const seat = new Seat({
            no: seatData.no,
            stages_id: seatData.stage_id,
          });
          await seat.save();
          return seat;
        } catch (error) {
          console.error(error);
          throw error;
        }
      })
    );

    const response = {
      stage: stageData,
      seats: savedSeats,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetStages, CreateStage };
