const express = require("express");

const { User } = require("../../service/schemas/user.schema");

const router = express.Router();

const { signup } = require("../../service/usersService");

const { signupAndLoginSchema } = require("../../validation/Joi");

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

module.exports = router;
