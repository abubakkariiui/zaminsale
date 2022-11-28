const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const fs = require("fs");
const Property = require("../../models/Property");
const User = require("../../models/User");
const Image = require("../../models/Image");
const path = require("path");
const checkObjectId = require("../../middleware/checkObjectId");
const AdminAuth = require("../../middleware/AdminAuth");
const Admin = require("../../models/Admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

// const checkObjectId = require("../../middlew`a`re/checkObjectId");
router.post(
  "/create-post",
  [upload.single("image"), auth],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newProperty = new Property({
        name: user.name,
        user: req.user.id,
        pName: req.body.pName,
        cover: req.body.cover,
        location: req.body.location,
        city: req.body.city,
        price: req.body.price,
        type: req.body.type,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        category: req.body.category,
        priceRange: req.body.priceRange,
        specification: req.body.specification,
      });

      const property = await newProperty.save();
      res.json(property);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/update-post", [upload.single("image"), auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json("user not found");
    }
    const UpdateProperty = {
      name: user.name,
      user: req.user.id,
      pName: req.body.pName,
      cover: req.body.cover,
      location: req.body.location,
      city: req.body.city,
      price: req.body.price,
      type: req.body.type,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      category: req.body.category,
      priceRange: req.body.priceRange,
      specification: req.body.specification,
    };
    const id = req.body._id;
    console.log(id);
    let property = await Property.findByIdAndUpdate(id, UpdateProperty, {
      new: true,
    });
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.put("/update-post-admin", upload.single("image"), async (req, res) => {
  try {
    const UpdateProperty = {
      pName: req.body.pName,
      cover: req.body.cover,
      location: req.body.location,
      city: req.body.city,
      price: req.body.price,
      type: req.body.type,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      category: req.body.category,
      priceRange: req.body.priceRange,
      specification: req.body.specification,
    };
    const id = req.body._id;
    console.log(id);
    let property = await Property.findByIdAndUpdate(id, UpdateProperty, {
      new: true,
    });
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/upload-photo", upload.single("img"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(url);
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString("base64");
  var final_img = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_img, "base64"),
  };
  Image.create(final_img, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.contentType(final_img.contentType);
      res.end(url + "/uploads/" + req.file.filename);
    }
  });
});
router.post("/all-properties", async (req, res) => {
  try {
    const property = await Property.find()
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);
    // .limit(req.body.limit)
    // .skip(req.body.skip);

    res.json({ property, totalPost: property.length });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.post("/my-properties", async (req, res) => {
  try {
    const { id } = req.body;

    const property = await Property.find({ user: id })
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);

    res.json({ property, totalPost: property.length });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.post("/specific-property", async (req, res) => {
  try {
    const type = req.body.value;
    console.log(type);
    const property = await Property.find({ type })
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);
    // .limit(req.body.limit)
    // .skip(req.body.skip);

    res.json({ property, totalPost: property.length });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.post("/range-properties", async (req, res) => {
  try {
    const { city, type, price } = req.body;
    console.log(city, type, price);
    const property = await Property.find({ city, type })
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);

    res.json({ property });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.post("/view-property", async (req, res) => {
  try {
    const pName = req.body.value;
    console.log(pName)
    const property = await Property.findOne({ pName }).populate("user", [
      "name",
      "email",
    ]);
    res.json({ property });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.delete(
  "/delete-property/:id",
  [auth, checkObjectId("id")],
  async (req, res) => {
    try {
      console.log("first");
      const property = await Property.findById(req.params.id);

      if (!property) {
        return res.status(404).json({ msg: "property not found" });
      }

      if (property.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      await property.remove();

      res.json({ msg: "property removed" });
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server Error");
    }
  }
);
router.delete("/delete-property-admin/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "property not found" });
    }

    await property.remove();

    res.json({ msg: "property removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.post("/buy-property", async (req, res) => {
  let { amount, id, p_id } = req.body;
  amount= amount*10;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount*10,
      currency: "PKR",
      description: "Rent Pay",
      payment_method: id,
      confirm: true,
    });
    console.log(amount)
    if (payment) {
      const UpdateProperty = {
        pName: req.body.pName,
        cover: req.body.cover,
        location: req.body.location,
        city: req.body.city,
        price: req.body.price,
        type: req.body.type,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        category: req.body.category,
        priceRange: req.body.priceRange,
        specification: req.body.specification,
      };
      await Property.findByIdAndUpdate(p_id, UpdateProperty, {
        new: true,
      });
    }
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});
// Admin Side
router.post("/create-post-admin", async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await Property.findById(req.user.id).select("-password");
    const newProperty = new Property({
      name: user.name,
      user: req.user.id,
      pName: req.body.pName,
      cover: req.body.cover,
      location: req.body.location,
      city: req.body.city,
      price: req.body.price,
      type: req.body.type,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      category: req.body.category,
      priceRange: req.body.priceRange,
      specification: req.body.specification,
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
