const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Token = require("../models/Token")
const sendEmail = require('../utils/SendMail')
const crypto = require('crypto');
const { data } = require("autoprefixer");
const jwt_decode = require("jwt-decode")

router.post("/profile", async (req, res) => {
  console.log(req.body);
  let token = req.body.token;
  if(!token){
    return res.json({
      status:'Failed',
      data:'None',
      message:'Not aunthenticated!'
    })
  }
  console.log(token);
  let decoded = jwt_decode(token);
  let email = decoded.email;
  let user = await User.findOne({ email: email });
  return res.json({
    data: user,
  });
});


router.post("/register", async (req, res) => {
	try {
    let { name, email,phone,address, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);

  name = name.trim();
  email = email.trim();
  password = password.trim();
  phone = phone.trim();
  console.log(phone);
  console.log(phone.length)

  if (name == "" || email == "" || password == ""||phone=="" || address=="") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  }else if(phone.length != 10){
    res.json({
      status:'Failed',
      message:'Invalid Phone no'
    })

  }
  else if(address.length < 10 || address.length > 100){
    res.json({
      status:'Failed',
      message:'Address Length must be between 10 and 100 characters'
    })
    
  }
   else if (!/^[a-zA-z]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid Name!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid Email!",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password too short",
    });
  }
  else{
		let user = await User.findOne({ email: req.body.email });
    console.log(user)
    
		if (user){
      return res.json({
        status:'Failed',
        message:'User already exists!'
      })
    }

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		return res.json({
      status:'SUCCESS',
      message:'Sign up successful! Please verify your email to continue!'
    })
  }
	} catch (error) {
		console.log(error);
		res.json({
      status:'Failed',
      message:'Internal server error'
    })
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
    
    console.log("inside bro")
		const user = await User.findOne({ _id: req.params.id });
    console.log("User => ", user);
		if (!user){
      return res.json({
        status:'Failed',
        message:'Invalid Link!'
      })
    }

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
    console.log("Token => ", token)
		if (!token){
      return res.json({
        status:'Failed',
        message:'Invalid Link!'
      })
    }
    console.log("user verified")

		await User.updateOne({ _id: user._id }, {$set: {verified: true}});
		await token.remove();
    console.log("user verified2")
		return res.json({
      status:'Success',
      message:'Email Verified successfully!!'
    })
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/signin", async (req, res) => {
	try {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();
  
  if (email == "" || password == "") {
    return res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  }
  else{
		const user = await User.findOne({ email: req.body.email });
		if (!user){
			return res.json({
        status:'Failed',
        message:'Invalid Email or Password'
      })
    }

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword){
      return res.json({
        status:'Failed',
        message:'Invalid Email or Password'
      })
    }
		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			return res.json({
        status:"Pending",
        message:"An email has been sent!Please Verify"
      })
		}

    console.log("User successfully logged in")
		// const token = user.generateAuthToken();
    const userr = {email:email}
    const token = jwt.sign(userr,'sbksid')
    console.log(token);
    console.log("User successfully logged in")
		res.json({
      status:'SUCCESS',
      message:'Successfully logged in',
      data:data,
      userr:token
    })
  }
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
