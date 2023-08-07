const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../model/user");
const Animal = require("../model/animal");
const animal = require("../model/animal");
const fs = require("fs");

//get animals
const GetAnimals = async (req, res) => {
  try {
    const animals = await animal.find();
    if (animals) {
      res.status(200).json(animals);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

//create animals
const CreateAnimal = async (req, res) => {
  try {
    const { animal_name, animal_species, animal_type, animal_show_duration } =
      req.body;

    const { filename } = req.file ? req.file : "";

    const data = await animal.create({
      animal_name,
      animal_species,
      animal_type,
      animal_show_duration,
      animal_image: filename,
      isActive: true,
    });

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

//delete
const DeleteAnimal = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json("Id not found");
    }

    const animals = await animal.findById(id);
    if (!animals) {
      return res.status(404).json({ error: "animal not found" });
    }

    const imagePath = "uploads/public/images/" + animals.animal_image;
    if (animals.animal_image !== null) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Image file deleted successfully");
      });
    }

    animals.deleteOne();
    return res.status(200).json({ msg: "Delete Animal successfully" });
  } catch (error) {
    console.log(error);
  }
};

//GetbyId
const GetAnimalById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    if (!id) {
      res.status(400).json("Id not found");
    }

    const animals = await animal.findById({ _id: id });
    if (animals) {
      res.status(200).json(animals);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

//UpdateById
const UpdateAnimalById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      animal_name,
      animal_species,
      animal_type,
      animal_show_duration,
      animal_image,
      isActive,
    } = req.body;
    const { filename } = req.file ? req.file : "";
    const updatedData = {
      animal_name: animal_name,
      animal_species: animal_species,
      animal_type: animal_type,
      animal_show_duration: animal_show_duration,
      animal_image: animal_image,
      isActive: isActive,
    };
    if (!id) {
      res.status(400).json("Id not found");
    }

    //ถ้ามี รูปใหม่ ให้ลบรูปเก่า
    if (filename) {
      const imagePath = "uploads/public/images/" + updatedData.animal_image;

      fs.unlink(imagePath, (err) => {
        if (err) {
          if (err.code === "ENOENT") {
            console.log("File does not exist");
          } else {
            console.error(err);
            return;
          }
        } else {
          console.log("Image file deleted successfully");
        }
      });

      updatedData.animal_image = filename;

      animal
        .findByIdAndUpdate(id, updatedData)
        .then(() => {
          console.log("animal updated successfully");
        })
        .catch((error) => {
          console.error("Error updating animal:", error);
        });
      res.status(201).json({ msg: "Update animal and New image successfully" });
    } else {
      // console.log("old", updatedData);
      animal
        .findByIdAndUpdate(id, updatedData)
        .then(() => {
          console.log("animal updated successfully");
        })
        .catch((error) => {
          console.error("Error updating animal:", error);
        });
      res.status(201).json({ msg: "Update animal successfully" });
    }

    // console.log("id : ", id);
    // console.log("filename : ", filename);
    // console.log("body : ", req.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetAnimals,
  CreateAnimal,
  DeleteAnimal,
  GetAnimalById,
  UpdateAnimalById,
};
