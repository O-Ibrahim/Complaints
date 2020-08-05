const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const mongoose = require("./db/mongoose");
var cors = require("cors");

const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const complaintRoute = require("./routes/complaint");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());
//Routes
app.use("/user/", userRoute);
app.use("/admin/", adminRoute);
app.use("/complaint/", complaintRoute);
//Listener
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
