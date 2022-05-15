const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Item = require('./../models/Item')

router.post('/list',(req,res)=>{
    let { name, typee, days, images } = req.body;
    // console.log(name);
    // console.log(typee);
    // console.log(days);
    console.log(images);
    
    typee = typee.trim();
    days = days.trim();
    if(name=="" ||typee=="" || days==""){
        res.json({
            status:'Failed',
            message:'Input fields Empty'
        })

    }
    const user = User.findOne({ _id: req.params.id });
    // console.log(user);
    // console.log("HI");
    const newItem = new Item({
        userId:user._id,
        name,
        typee,
        days,
      });
      

      newItem
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

