const express = require("express");
const auth = require("../middleware/auth");

const {
  Register,
  Login,
  Welcome,
  RefreshToken,
} = require("../controllers/user");
const {
  GetAnimals,
  CreateAnimal,
  DeleteAnimal,
  GetAnimalById,
  UpdateAnimalById,
} = require("../controllers/animal");
const upload = require("../upload");
const { GetStages, CreateStage } = require("../controllers/stage");
const { GetSeats } = require("../controllers/seat");
const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/welcome", auth, Welcome);
router.post("/refresh/token", RefreshToken);

//Manage animals
router.get("/admin/animals", auth, GetAnimals);
router.post("/admin/animals", auth, upload.single("image"), CreateAnimal);
router.delete("/admin/animals/:id", auth, DeleteAnimal);
router.get("/admin/animals/:id", auth, GetAnimalById);
router.put(
  "/admin/animals/:id",
  auth,
  upload.single("image"),
  UpdateAnimalById
);

//Manage Stages
router.get("/admin/stages", auth, GetStages);
router.post("/admin/stages", auth, CreateStage);

//Manage Seats
router.get("/admin/seats/:id", auth, GetSeats);

module.exports = router;
