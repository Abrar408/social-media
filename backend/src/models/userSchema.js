const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false
    },
    pass:{
        type:String,
        required:true
    }
})
const User = mongoose.model('USER', userSchema)
module.exports = User;