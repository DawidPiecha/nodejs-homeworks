const express = require("express");

require("dotenv").config();

const { User } = require("../../service/schemas/user.schema");

const router = express.Router();

const { signup, login } = require("../../service/usersService");

const { signupAndLoginSchema } = require("../../validation/Joi");

const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;

    const userToSignup = signupAndLoginSchema.validate({ email, password });
    if (userToSignup.error) {
      return res
        .status(400)
        .json({ message: userToSignup.error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email in use" });
    }

    const newUser = await signup({ email, password, subscription });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userToLogin = signupAndLoginSchema.validate({ email, password });
    if (userToLogin.error) {
      return res
        .status(400)
        .json({ message: userToLogin.error.details[0].message });
    }
    const user = await login(email, password);

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
