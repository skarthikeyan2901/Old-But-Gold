const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Item = require('./../models/Item')

<<<<<<< HEAD
router.post('/list',async(req,res)=>{
   // console.log("Req body is",req.body);
    let { name, typee, days,userr} = req.body;
    
    console.log("Inside Mail",req.body.userr.email)
=======
router.post('/list',(req,res)=>{
    let { name, typee, days, images } = req.body;
    // console.log(name);
    // console.log(typee);
    // console.log(days);
    console.log(images);
>>>>>>> 933cfa5f1b667a406b25e9dfd4bc29450bb6ff68
    
    typee = typee.trim();
    days = days.trim();
    if(name=="" ||typee=="" || days==""){
        res.json({
            status:'Failed',
            message:'Input fields Empty'
        })

    }
<<<<<<< HEAD
    let user = await User.findOne({ email:req.body.userr.email});
    console.log("User=>",user);
    const newItem = await new Item({
=======
    const user = User.findOne({ _id: req.params.id });
    // console.log(user);
    // console.log("HI");
    const newItem = new Item({
>>>>>>> 933cfa5f1b667a406b25e9dfd4bc29450bb6ff68
        userId:user._id,
        name,
        typee,
        days,
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
    
    
})


module.exports = router;

