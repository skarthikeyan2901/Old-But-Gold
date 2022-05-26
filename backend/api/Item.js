const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const User = require("./../models/User");
const Item = require('./../models/Item');

const uploadtoAzure = require('../azure/fileUpload');

// Using multer for disk Storage
// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, "./uploads/");
//   },
//   filename: (req, file, callBack) => {
//     callBack(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });

const baseImageUrl = "https://obgimages.blob.core.windows.net/obg-container/";

router.post("/list", upload.single("images"), async (req, res) => {

  if(req.body.name == "" || req.body.itemType.trim() == "" || req.body.days.trim() == "") {
    res.json({
      status: "Failed",
      message: "Input fields Empty",
    });
  }

  let user = await User.findOne({ email: req.body.currentUser });
  console.log(user);

  let fileName = baseImageUrl + req.file.originalname;

  const newItem = await new Item({
    userId: user._id,
    name: req.body.name,
    itemType: req.body.itemType,
    daysUsed: req.body.days,
    // images: {
    //   data: fs.readFileSync("uploads/" + req.file.filename),
    //   contentType: req.file.mimetype
    // }
    images: fileName
  });

  await newItem
    .save()
    .then((result) => {
      uploadtoAzure("obg-container", req.file, req.file.originalname);
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

