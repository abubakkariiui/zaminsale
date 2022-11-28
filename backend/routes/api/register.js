const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
// const normalize = require("normalize-url");

const User = require("../../models/User");

router.post(
  "/register",
  [
    check("fname", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fname, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
        // console.log(user);

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        fname,
        email,
        // avatar,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10); //Generating Salt 10 numbers 

      user.password = await bcrypt.hash(password, salt); //Hash Create

      await user.save(); // Save here
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(  //jwt json token
        payload,
        process.env.secretOrKey,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
