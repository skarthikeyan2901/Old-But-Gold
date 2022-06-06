const express = require("express");
const multer = require("multer");
const router = express.Router();
const User = require("./../models/User");
const Item = require('./../models/Item');
const jwt_decode = require("jwt-decode")

const uploadtoAzure = require('../azure/fileUpload');

const upload = multer({ storage: multer.memoryStorage() });

const baseImageUrl = "https://obgimages.blob.core.windows.net/obg-container/";

router.post("/list", upload.single("images"), async (req, res) => {
  console.log(req.body);

  let token = req.body.token;
  console.log(token);
  if(!token){
    return res.json({
      status:'Failed',
      message:'Not aunthenticated'
    })
  }

  if(req.body.name == "" || req.body.itemType.trim() == "" || req.body.days.trim() == "") {
    res.json({
      status: "Failed",
      message: "Input fields Empty",
    });
  }

  let user = await User.findOne({ email: req.body.currentUser });
  console.log(user);

  let fileName = baseImageUrl + req.file.originalname;
  let today = new Date();

  const newItem = await new Item({
    userId: user.email,
    name: req.body.name,
    itemType: req.body.itemType,
    daysUsed: req.body.days,
    images: fileName,
    datePosted: today,
    issued: false
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
  let token = req.body.token;
  if(!token){
    return res.json({
      status:'Failed',
      message:'User not aunthenticated'

    })
  }
  await Item.find()
  .then(items => res.json({items}))
})

router.post("/issueItem", async (req, res) => {
  let user = await User.findOne({ email: req.body.user });
  await Item.findOneAndUpdate({ _id: req.body.itemId }, {$set: {issued: true, issueTo: user.email}})
  .then(() => {
    res.json({
      status: "SUCCESS",
      message: "Succesfully obtained item!"
    })
  })
  .catch(() => {
    res.json({
      status: "Failed",
      message: "Error while obtaining item! Try again!"
    })
  })
})

router.post("/profile",async(req,res)=>{
  let token = req.body.token;
  //console.log(token);
  if(!token){
    return res.json({
      status:'Failed',
      message:'Not aunthenticated!'
    })
  }
  let decoded = jwt_decode(token);
  let email = decoded.email;
  let sold_items = await Item.find({userId:email},{name:1,_id:0});
  //console.log(sold_items);
  return res.json({
    data:sold_items
  })


})

router.post("/getItem",async(req,res)=>{
  let token = req.body.token;
  if(!token){
    return res.json({
      status:'Failed',
      message:'Not aunthenticated'
    })
  }
  console.log(token);
  let decoded = jwt_decode(token);
  let email = decoded.email;
  let get_item = await Item.find({issueTo:email,issued:true},{name:1,_id:0});
  console.log(get_item,"Item Got");
  return res.json({
    data:get_item
  })
  
})


module.exports = router;

