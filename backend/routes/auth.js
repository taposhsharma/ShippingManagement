const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const User = require('../models/user');
const Employee = require('../models/employee')
const requireLogin = require('../middleware/requireLogin');



router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !password || !email){
        return res.status(422).json({error:"please fill all the fields"})
    }
    else{
        User.findOne({email:email})
            .then(savedUser =>{
                if(savedUser){
                    return res.status(422).json({error:"email already exists"})
                }
                else{
                    bcrypt.hash(password,12)
                          .then(hashedPassword =>{
                            const newuser = new User({name,email,password:hashedPassword})
                            newuser.save()
                                    .then(user =>{
                                        return res.status(200).json({msg:"user added successfully"})
                                    })
                                    .catch(err=>console.log(err))
                          })
                }
            }
            )
    }
})


router.post("/addemp",(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !password || !email){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    else{
        Employee.findOne({email:email})
            .then(savedUser =>{
                if(savedUser){
                    return res.status(422).json({error:"email already exists"})
                }
                else{
                    bcrypt.hash(password,12)
                          .then(hashedPassword =>{
                            const newuser = new Employee({name,email,password:hashedPassword})
                            newuser.save()
                                    .then(user =>{
                                        return res.status(200).json({msg:"user added successfully"})
                                    })
                                    .catch(err=>console.log(err))
                          })
                }
            }
            )
    }
})

router.post('/signin',(req,res) =>{
    const {email,password,pos} = req.body
    if(!email || !password || !pos){
        return res.status(422).json({error:"Please add email or password or position"})
    }
    if(pos=="Admin"){
    User.findOne({email:email})
        .then(savedUser =>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid Email!!"})
            }
            bcrypt.compare(password,savedUser.password)
                .then(doMatch =>{
                    if(doMatch){
                        // res.json({message:"Successfully signed in"})
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                        const {_id,email,name,position} = savedUser
                        return res.json({token,user:{_id,email,name,position}})
                    }else{
                        return res.status(422).json({error:"Invalid Password"})
                    }
                })
        })
        .catch(err => console.log(err))
    }
    else if(pos == "Employee"){
        Employee.findOne({email:email})
        .then(savedUser =>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid Email!!"})
            }
            bcrypt.compare(password,savedUser.password)
                .then(doMatch =>{
                    if(doMatch){
                        // res.json({message:"Successfully signed in"})
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                        const {_id,email,name,position} = savedUser
                        return res.json({token,user:{_id,email,name,position}})
                    }else{
                        return res.status(422).json({error:"Invalid Password"})
                    }
                })
        })
        .catch(err => console.log(err))
    }
})

router.get('/protected',requireLogin,(req,res) =>{
    res.send("protected!!!");
})

module.exports = router