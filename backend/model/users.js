const mongoose = require('mongoose');
const {format} = require('date-fns');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
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
    password:{
        type:String,
        required:true
    },
    joined:{
        type:String,
        required:true,
        default:format(new Date(),'dd-MMM-yyyy')
    },
    following:{
        type:Array,
        required:false,
        default:[],
    },
    refreshToken:{
        type:String,
        default:''
    }
});
module.exports = mongoose.model('User', userSchema);