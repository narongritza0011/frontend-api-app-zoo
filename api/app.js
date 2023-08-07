require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://64a9aaef51fcd529834f2f06--superlative-pavlova-fd0f37.netlify.app",
    ],
  })
);
app.use(express.json());
//ให้เข้าถึงรูปได้
app.use(express.static("uploads/public/"));
//routes  here
app.use("/api/v1/", router);

module.exports = app;
