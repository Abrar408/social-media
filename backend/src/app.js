const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
require('./db/conn')
// const User = require('./models/userSchema')
const app = express();


const db = mongoose.connection

app.use(cors({
    origin: '*'
}))
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello")
})
app.post('/regUser',(req,res)=>{
    
    let {user,email,gender,pass} = req.body
    // console.log(email)
    // User.findOne({email})
    // .then(result =>{
    //     if(result){
    //         return res.status(400).send("email already exists")
    //     }
    //     else{
    //         const user = new User({user,email,gender,pass});
    //         user.save().then(() =>{
    //             res.status(200).send("user created")
    //         })
    //     }
        
    // })
    db.collection('user').findOne({email},(err,result)=>{
        if (err) throw err
        if(result){
            res.status(400).send("email is already registered")            
        }
        else{
            myFunc = async () => {
                console.log("1")
                const salt = await bcrypt.genSalt(10);
                console.log("2")
                pass= await bcrypt.hash(pass,salt)
                console.log(pass)
                db.collection('user').insertOne({user,email,gender,pass},(err,result)=>{
                res.status(200).send("Registration Successful");   
            })
            }
            myFunc()            
        }
    })
    
})
app.post('/loginUser',(req,res)=>{
    
    const{email,pass} = req.body
    
    db.collection('user').findOne({email},(err,result)=>{
        if (err) throw err
        if(result){
            console.log(result)
            const myFunc = async () =>{
                const isMatch = await bcrypt.compare(pass,result.pass)
                const token = jwt.sign({_id:result._id},"secret")
                if(isMatch){
                    res.status(200).send("success")
                }
                else{
                    res.status(400).send("Email or password is incorrect")
                }
            }
            myFunc()
            
            // console.log(result)           
        }
        else{
            res.status(400).send("Email not found")
            // db.collection('users').insertOne(req.body,(err,result)=>{
            // res.status(200).send("Registration Successful");   
            // })
        }
    })
    
})
app.listen(PORT,()=>{
    console.log(`server up on ${PORT}`)
})