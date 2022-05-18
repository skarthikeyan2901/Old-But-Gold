const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const User = require("./../models/User");
const Item = require('./../models/Item')

// Using multer for disk Storage
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/list", upload.single("images"), async (req, res) => {

  if(req.body.name == "" || req.body.itemType.trim() == "" || req.body.days.trim() == "") {
    res.json({
      status: "Failed",
      message: "Input fields Empty",
    });
  }

  let user = await User.findOne({ email: req.body.currentUser });
  console.log(user);

  const newItem = await new Item({
    userId: user._id,
    name: req.body.name,
    itemType: req.body.itemType,
    daysUsed: req.body.days,
    images: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: req.file.mimetype
    }
  });

  await newItem
    .save()
    .then((result) => {
      res.json({
        status: "SUCCESS",
        message: "Data Stored successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "Error while saving user",
      });
    });
});

router.get("/getItems", async (req, res) => {
  await Item.find()
  .then(items => res.json({items}))
})


module.exports = router;

