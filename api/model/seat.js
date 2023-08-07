const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    no: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },

    stages_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stage",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
      default: null,
    },
    dateTime: { type: Date, required: false, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seat", seatSchema);
