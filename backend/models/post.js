const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    packagedetail:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Yet to Deliver"
    }
})

module.exports = mongoose.model('Post',postSchema)