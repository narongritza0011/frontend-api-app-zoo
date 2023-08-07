const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../model/user");

//Register
const Register = async (req, res) => {
  //register logic

  try {
    //Get user input
    const { first_name, last_name, email, password } = req.body;

    //validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    //check if user already exist
    //validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exist. Please login");
    }

    //Encrypt user password
    encyptedPassword = await bcrypt.hash(password, 10);
    //create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encyptedPassword,
      role: "user",
    });

    //create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    //save user token
    user.token = token;

    //return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

//login
const Login = async (req, res) => {
  //login logic
  try {
    //get user input
    const { email, password } = req.body;
    // console.log(req.body);
    //validate user input
    if (!(email && password)) {
      res.status(400).json("All input is required");
    }

    //Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Create token
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      //save user token

      user.token = token;
      // newUser to send json
      let newUser = {
        _id: user._id,
        // first_name: user.first_name,
        // last_name: user.last_name,
        // email: user.email,
        token: user.token,
        role: user.role,
      };

      res.status(200).json(newUser);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

const Welcome = (req, res) => {
  res.status(200).send("Welcome");
};

const RefreshToken = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json("id is required!");
    }
    const user = await User.findOne({ _id: id });
    if (user) {
      let newUser = {
        // _id: user._id,
        // email: user.email,
        token: user.token,
        role: user.role,
      };
      res.status(200).json(newUser);
      // console.log(user);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Register,
  Login,
  Welcome,
  RefreshToken,
};
