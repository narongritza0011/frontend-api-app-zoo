const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema(
  {
    room: { type: String, unique: true, required: true },
    seat: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stage", stageSchema);
