const express = require("express");
const routes = express.Router();
const User = require("../../models/User");

routes.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

routes.post("/login", async (req, resp) => {
  if (req.body.email && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "No user Found" });
    }
  } else {
    resp.send({ result: "No user Found" });
  }
});

module.exports = routes;
