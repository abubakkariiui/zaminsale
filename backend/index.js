const express = require("express");

const cors = require("cors");
const connectDB = require("./db/db");
const app = express();
const bodyParser = require("body-parser");
connectDB();
app.use(express.json());
app.use(cors());
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static(process.cwd() + "/uploads"));
app.use("/api/v4/", require("./routes/api/user"));
app.use("/api/user/", require("./routes/api/register"));
app.use("/api/auth/", require("./routes/api/auth"));
app.use("/api/property/", require("./routes/api/property"));
app.use("/api/admin/", require("./routes/api/adminAuth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
