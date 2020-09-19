const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../model/User");
const Offre = require("../model/Offer");

router.post("/user/sign_up", async (req, res) => {
  try {
    const emailFounded = await User.findOne({ email: req.fields.email });
    if (emailFounded) {
      res
        .status(400)
        .json({ message: "Count already created with this email" });
    } else {
      const password = req.fields.password;
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const email = req.fields.email;
      const username = req.fields.username;
      const phone = req.fields.phone;
      if (email && username && phone && password) {
        const newUser = new User({
          email: req.fields.email,
          token: token,
          hash: hash,
          salt: salt,
          account: {
            username: req.fields.username,
            phone: req.fields.phone,
          },
        });
        await newUser.save();

        res.status(200).json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          account: newUser.account,
        });
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/log_in", async (req, res) => {
  try {
    const userFounded = await User.findOne({ email: req.fields.email });
    //console.log(user);
    if (userFounded) {
      if (
        SHA256(req.fields.password + userFounded.salt).toString(encBase64) ===
        userFounded.hash
      ) {
        res.status(200).json({
          _id: userFounded._id,
          token: userFounded.token,
          account: userFounded.account,
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
