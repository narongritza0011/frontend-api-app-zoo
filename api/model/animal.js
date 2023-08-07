const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    animal_name: { type: String },
    animal_species: { type: String },
    animal_type: { type: String },
    animal_show_duration: { type: String },
    animal_image: { type: String, default: null , required: false },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("animal", animalSchema);
