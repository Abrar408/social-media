const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose')
// const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
require('./db/conn')
// const User = require('./models/userSchema')
const app = express();


const db = mongoose.connection

app.use(cors({
    origin: '*'
}))
app.use(express.json());
// app.use(cookieParser())

app.post('/userList',async (req,res)=>{
    const {input} = req.body

    // console.log("1")
    console.log(input)
    const regex = new RegExp(`${input}`,"i")
var cursor = db.collection('user').find({user:regex})
    let users = []
    await cursor.forEach((user) => {
        users.push(user)
    })
    // let newUser = users.filter(user => user.)
    // console.log(users)
    res.status(200).send(users)
    // res.status(200).send("ok")
    // db.collection('user').find({}).toArray((err,result)=>{
    //     if(err) throw err
    //     if(result.length > 0){
    //         // console.log("ok") 
    //         // console.log(res)
    //         res.status(200).json(result)
    //     }
    //     else{
    //         res.status(404).send('User not found')
    //     }
    // })
    // console.log("2")
    //     (err,res)=>{
    //     if (err) throw err
    //     if(res){
    //         console.log("2")
    //         console.log(res)
    //         // res.json(users)
    //     }
    // }
    // ).pretty()
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
                
                if(isMatch){
                    
                    res.status(200).json(result)
                    // const accessToken = jwt.sign({"email":result.email},"secret",{expiresIn:'1h'})
                    // const refreshToken = jwt.sign({"email":result.email},"secret",{expiresIn:'1d'})
                    // db.collection('user').updateOne({email:result.email},{$set:{refreshToken}},{upsert:true})
                    // res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000})
                    // res.json({accessToken,result})
                    // res.status(200).send("success")
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
// app.post('/followerList',(req,res)=>{

// })
app.listen(PORT,()=>{
    console.log(`server up on ${PORT}`)
})