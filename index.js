const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

const userRoute = require("./routes/user");
app.use(userRoute);
const offreRoute = require("./routes/offre");
app.use(offreRoute);
const isAuthenticated = require("./middleware/isAuthenticated");
app.use(isAuthenticated);
const paymentRoute = require("./routes/payment");
app.use(paymentRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
