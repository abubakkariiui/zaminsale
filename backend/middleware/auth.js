const jwt = require("jsonwebtoken");
const USER = require("../models/User");

module.exports = middleware = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(401).json({ error: "User is Not Authorized" });
    }

    const decode = jwt.verify(token, process.env.secretOrKey);

    const data = await USER.findById(
      decode._id || decode.id || decode.user.id || decode.user._id
    );

    req.user = data;

    next();
  } catch (err) {
    res.status(401).json({ error: "Token Verification failed" });
  }
};
