const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Item = require('./../models/Item')

router.post('/list',async(req,res)=>{
   // console.log("Req body is",req.body);
    let { name, typee, days,userr} = req.body;
    
    console.log("Inside Mail",req.body.userr.email)
    
    typee = typee.trim();
    days = days.trim();
    if(name=="" ||typee=="" || days==""){
        res.json({
            status:'Failed',
            message:'Input fields Empty'
        })

    }
    let user = await User.findOne({ email:req.body.userr.email});
    console.log("User=>",user);
    const newItem = await new Item({
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

