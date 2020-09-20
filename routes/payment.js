const express = require("express");
const router = express.Router();
const createStripe = require("stripe");
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

const stripe = createStripe(process.env.STRIPE_API_SECRET);

router.post("/payment", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: req.fields.amount,
      currency: "eur",
      description: `Paiement leboncoin pour : ${req.fields.title}`,
      source: req.fields.token,
    });
    res.json({ status });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
