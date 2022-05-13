const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Token = require("../models/Token")
const sendEmail = require('../utils/SendMail')
const crypto = require('crypto')


router.post("/register", async (req, res) => {
	try {
    let { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);

  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-z]*$/.test(name)) {
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
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		return res.json({
      status:'Pending',
      message:'Please verify your email!'
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
    
    
		const user = await User.findOne({ _id: req.params.id });
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
		if (!token){
      return res.json({
        status:'Failed',
        message:'Invalid Link!'
      })
    }

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		return res.json({
      status:'Success',
      message:'Email Verified successfully!!'
    })
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
/*

router.post("/register", async(req, res) => {
  let { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);

  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-z]*$/.test(name)) {
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
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "FAILED",
            message: "User already Exists!",
          });
        } else {
          const saltrounds = 10;
          bcrypt
            .hash(password, saltrounds)
            .then((hashedPassword) => {


              const newUser = new User({
                name,
                email,
                password: hashedPassword,
              });
              

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "SignUp Success",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "Error while saving user",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "Failed",
                message: "Error while hashing password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "Some error bro!",
        });
      });
  }
});
*/
/*
router.post("/signin", (req, res) => {
  console.log("HI");
  let { email, password } = req.body;
  console.log("HI");

  email = email.trim();
  password = password.trim();
  
  if (email == "" || password == "") {
    return res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else {
    User.find({ email })
      .then((data) => {
        if (data.length) {
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                const user = {email:email}
                console.log(email);
                
                const token = jwt.sign(user,'sbksid')
                
                return res.json({
                  status: "SUCCESS",
                  message: "Sign In Successful",
                  data: data,
                  user:token
                  
                });
              } else {
                return res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                  
                });
              }
            })
            .catch((err) => {
              console.log(err);
              return res.json({
                status: "FAILED",
                message: "Error while comparing passwords!",
              });
            });
        } else {
          return res.json({
            status: "Failed",
            message: "Invalid Credentials entered",
          });
        }
      })
      .catch((err) => {
        return res.json({
          status: "FAILED",
          message: "Error while finding email in database!",
        });
      });
  }
});
*/

router.post("/signin", async (req, res) => {
	try {
    console.log("HI");
  let { email, password } = req.body;
  console.log("HI");

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
				const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			return res.json({
        status:"Pending",
        message:"An email has been sent!Please Verify"
      })
		}

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
  }
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
