const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const userRoute = require("./user");
const User = require("../model/User");
const Offre = require("../model/Offer");

const app = express();
app.use(formidable());

const isAuthenticated = require("../middleware/isAuthenticated");

cloudinary.config({
  cloud_name: "dbxmpuzvk",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    //console.log(req.user);
    // console.log(req.files);
    // console.log(req.files.picture.path);
    // console.log(req.files.picture.name);
    // console.log(req.files.picture.type);
    const picture = req.files.file.path;
    const description = req.fields.description;
    const title = req.fields.title;
    const price = req.fields.price;
    if (description && title && price && picture) {
      if (description.length < 500) {
        if (title.length < 50) {
          if (price < 100000) {
            const uploadweb = await cloudinary.uploader.upload(picture);
            // console.log(uploadweb);
            // console.log(uploadweb);
            // console.log(uploadweb.secure_url);
            const newOffre = new Offre({
              title: req.fields.title,
              description: req.fields.description,
              price: req.fields.price,
              picture: uploadweb,
              creator: req.user,
              created: new Date(),
            });
            await newOffre.save();
            res.status(200).json({
              _id: newOffre._id,
              title: newOffre.title,
              description: newOffre.description,
              price: newOffre.price,
              created: newOffre.created,
              creator: {
                account: newOffre.creator.account,
                _id: newOffre.creator._id,
              },
              picture: newOffre.picture,
            });
          } else {
            res.status(400).json({ message: "Limited price" });
          }
        } else {
          res
            .status(400)
            .json({ message: "Limited characters for title (50)" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Limited characters for description (500)" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Please fill all the fields to publish" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/offer/put", isAuthenticated, async (req, res) => {
  try {
    const title = req.fields.title;
    const price = req.fields.price;
    const description = req.fields.description;
    const picture = req.fields.picture;
    if (req.fields.id) {
      const offre = await Offre.findById(req.fields.id);
      //console.log(offre);
      if (req.fields.title) {
        offre.title = title;
        await offre.save();
      }
      if (req.fields.price) {
        offre.price = price;
        await offre.save();
      }
      if (req.fields.description) {
        offre.description = description;
        await offre.save();
      }
      if (req.fields.picture) {
        offre.picture = picture;
      }

      res.status(200).json(offre);
    } else {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/offer/delete", isAuthenticated, async (req, res) => {
  try {
    if (req.fields.id) {
      const offre = await Offre.findById(req.fields.id);
      await offre.deleteOne();
      res.status(200).json({ message: "Offer deleted" });
    } else {
      res.status(400).json({ message: "Please try again" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/offer/with-count", async (req, res) => {
  try {
    //console.log(req.query);
    const filters = {};
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }
    if (req.query.priceMin) {
      filters.price = {
        $gte: req.query.priceMin,
      };
    }
    if (req.query.priceMax) {
      if (filters.price) {
        filters.price.$lte = req.query.priceMax;
      } else {
        filters.price = {
          $lte: req.query.priceMax,
        };
      }
    }

    let sort = {};

    if (req.query.sort === "date-asc") {
      sort = { created: "asc" };
    } else if (req.query.sort === "date-desc") {
      sort = { created: "desc" };
    } else if (req.query.sort === "price-asc") {
      sort = { price: "asc" };
    } else if (req.query.sort === "price-desc") {
      sort = { price: "desc" };
    }

    // console.log(req.query.page, typeof req.query.page)
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);

    const offre = await Offre.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "creator",
        select: "account.username account.phone",
      });

    const count = await Offre.countDocuments(filters);
    //console.log(count);
    res.status(200).json({
      count: count,
      offre: offre,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/offer/:id", async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id).populate({
      path: "creator",
      select: "account.username account.phone",
    });
    //console.log(offre);
    res.status(200).json(offre);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
