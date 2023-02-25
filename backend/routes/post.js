const express = require('express')
const router = express.Router();
const Post = require('../models/post')
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');


router.post('/createpost',requireLogin,(req,res) =>{
    const {name,email,phone,packagedetail} = req.body
    if(!name|| !email || !phone ||!packagedetail){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password=undefined
    req.user.__v=undefined
    const post = new Post({
        name,
        email,
        phone,
        packagedetail
    })
    post.save().then(result =>{
        res.json({post:result})
        console.log(result)
        // console.log(req.user)
    })
    .catch(err=>{
        console.log(err)
    })
})




router.post('/packagedetail',(req,res) =>{
    const { id } =req.body;
    console.log(id)
    if(!id){
        res.status(422).json({error:"Please Enter Id"})
    }
    else{
    Post.findOne({_id:id})
        .then((savedUser)=>{
            if(savedUser){
            return res.json({user:savedUser})
                
            }else{
                res.status(422).json({error:"No Package for this id"})
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
})
router.post('/updatedetail',(req,res) =>{
    const { id } =req.body;
    console.log(id)
    if(!id){
        res.status(422).json({error:"Please Enter Id"})
    }
    else{
        Post.findByIdAndUpdate({_id:id},{"status": "Deliverd"}, function(err, result){

            if(err){
                console.log(err)
            }
            else{
                res.json({post:result})
            }
    
        })
    }
})

module.exports = router