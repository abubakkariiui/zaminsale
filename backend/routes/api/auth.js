const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const data = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.fname,
      };
      jwt.sign(
        payload,
        process.env.secretOrKey,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, data });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
router.post(
  "/forget-password",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let user = await User.findOne({ email }).select("-password");

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Email" }] });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
router.put(
  "/new-password",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(email, password);
    try {
      let user = await User.findOne({ email }).select("-password");

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid User" }] });
      }
      console.log(user.id);
      const resetPassword = new User({
        _id: user._id,
        fname: user.fname,
        email: user.email,
        role: user.role,
        password: password,
      });
      const salt = await bcrypt.genSalt(10);

      resetPassword.password = await bcrypt.hash(password, salt);
      // const res = await resetPassword.save();
      // res.json(res);
      await User.findByIdAndUpdate(user.id, resetPassword, {
        new: true,
      });
      res.json({ msg: "Password Updated Successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
