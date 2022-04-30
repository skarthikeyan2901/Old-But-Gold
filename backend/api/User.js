const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const bcrypt = require('bcryptjs');


router.post('/register',(req,res)=>{
    let{name,email,password} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    
    name = name.trim();
    email = email.trim();
    password = password.trim();
    
    
    

    if(name=="" ||email=="" || password==""){
        res.json({
            status:"FAILED",
            message:"Empty input fields!"
        })
    }
    else if(!/^[a-zA-z]*$/.test(name)){
        res.json({
            status:"FAILED",
            message:"Invalid Name!"

        })

    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status:"FAILED",
            message:"Invalid Email!"
        })
    }
    
    else if(password.length < 8){
        res.json({
            status:"FAILED",
            message:"Password too short"
        })

    }
    else{
        User.find({email}).then(result=>{
            if(result.length){
                res.json({
                    status:'FAILED',
                    message:'User already Exists!'
                })
            }
            else{
                const saltrounds = 10;
                bcrypt.hash(password,saltrounds).then(hashedPassword=>{
                    const newUser = new User({
                        name,
                        email,
                        password:hashedPassword,
                        
                    });

                    newUser.save().then(result=>{
                        res.json({
                            status:'SUCCESS',
                            message:'SignUp Success',
                            data:result
                        })
                    }).catch(err=>{
                        res.json({
                            status:'FAILED',
                            message:'Error while saving user'
                        })
                    })

                }).catch(err=>{
                    res.json({
                        status:'Failed',
                        message:'Error while hashing password'
                    })
                })

            }

        }).catch(err=>{
            console.log(err);
            res.json({
                status:'FAILED',
                message:'Some error bro!'
            })
        })

    }

})

router.post('/signin',(req,res)=>{
    let{email,password} = req.body;
    
    email = email.trim();
    password = password.trim();
    if(email=="" || password==""){
        res.json({
            status:"FAILED",
            message:"Empty input fields!"
        })
    }
    else{
        User.find({email}).then(data=>{
            if(data.length){
                const hashedPassword = data[0].password;
                bcrypt.compare(password,hashedPassword).then(result=>{
                    if(result){
                        res.json({
                            status:'SUCCESS',
                            message:'Sign In Successful',
                            data:data
                        })
                    }
                    else{
                        res.json({
                            status:"FAILED",
                            message:"Invalid password entered!"
                        })

                    }
                }).catch(err=>{
                    console.log(err);
                    res.json({
                        status:"FAILED",
                        message:"Error while comparing passwords!"
                    })

                })
            }
            else{
                res.json({
                    status:'Failed',
                    message:'Invalid Credentials entered'
                })
            }

        }).catch(err=>{
            res.json({
                status:"FAILED",
                message:"Error while finding email in database!"
            })

        })
    }
    
})

module.exports = router;