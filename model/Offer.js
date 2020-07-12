const mongoose = require("mongoose");
const Offre = mongoose.model("Offre", {
  created: Date,
  title: String,
  description: String,
  price: Number,
  picture: Object,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Offre;
