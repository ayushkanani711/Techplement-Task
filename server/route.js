const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const User = require("./model");

// Route 1
// Create User
router.post(
  "/signup",
  [
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password length atleast 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad requesrt and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email } = req.body;
    try {
      //Generate saltlet user = await User.findOne({ email });
      let exitingUser = await User.findOne({ email });
      if (exitingUser) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with new email" });
      }
      // Generate saslt
      const salt = await bcrypt.genSalt(10);
      //Add hase to password.
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Create user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      // Generate JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      success = true;
      res.json({
        success,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        authtoken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server Error" });
    }
  }
);

// Route 2
// Login User
router.post(
  "/login",
  [
    body("email", "Enter valid email.").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad requesrt and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct email credentials",
        });
      }
      // Compare password
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        // password does't match
        return res.status(400).json({
          success,
          error: "Please try to login with correct password credentials",
        });
      } else {
        // password match
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      success = true;
      res.json({
        success,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        authtoken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server Error" });
    }
  }
);

// Route 3
// Get user details
const fetchuser = (req, res, next) => {
  //Get user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token." });
  }
};

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// Route 4
// Store Calculation
router.post("/storeCalculation", fetchuser, async (req, res) => {
  try {
    const { operation, result } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.history.push({ operation, result, timestamp: new Date() });
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// Route 5
// Get History
router.post("/getHistory", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("history");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

module.exports = router;
