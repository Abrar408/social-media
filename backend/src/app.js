const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose');
const { json } = require('express');
const {ObjectId} = require('bson');
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

app.post('/userList',async (req,res)=>{
    console.log("userList")
    const {input,userid} = req.body
    const regex = new RegExp(`${input}`,"i")
    let users = []
    let currUser = []
    await db.collection('user').findOne({_id: new ObjectId(userid)},(err,result)=>{
        if(err) throw err
        if(result){
            currUser = result.following
        }
    })
    
    var cursor = db.collection('user').find({user:regex})
    
    await cursor.forEach( (user) => {
        // console.log(user._id.toString())
        if(user._id.toString() != userid){
            if(currUser.includes(user._id.toString())){
                users.push({user,b:true})
            }
            else{
                users.push({user,b:false})
            }
        }
        
        
    })
    
    res.status(200).send(users)
    
})
app.post('/regUser',(req,res)=>{
    console.log("regFollowing")
    let {user,email,gender,pass} = req.body
    
    db.collection('user').findOne({email},(err,result)=>{
        if (err) throw err
        if(result){
            res.status(400).send("email is already registered")            
        }
        else{
            myFunc = async () => {
                const joined = await (new Date()).toLocaleDateString()
                const following = []
                const salt = await bcrypt.genSalt(10);                
                pass= await bcrypt.hash(pass,salt)
                
                db.collection('user').insertOne({user,email,gender,pass,joined,following},(err,result)=>{
                res.status(200).send("Registration Successful");   
            })
            }
            myFunc()            
        }
    })
    
})
app.post('/loginUser',(req,res)=>{
    console.log("logFollowing")
    const{email,pass} = req.body
    
    db.collection('user').findOne({email},(err,result)=>{
        if (err) throw err
        if(result){
            // console.log(result)
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
app.post('/addFollowing',(req,res)=>{
    console.log("addFollowing")
    const {userid,currUser} = req.body
    // console.log(userid,currUser)
    db.collection('user').updateOne({email:`${currUser}`},{$push:{following:`${userid}`}})
    res.status(200).send("added")
})
app.post('/getFollowing',(req,res)=>{
    console.log("getFollowing")
    const {currUser} = req.body
    console.log(currUser)
    let folList = []
    db.collection('user').findOne({email:`${currUser}`},(err,result)=>{
        if(err) throw err
        if(result){
            console.log(result.following)
            if(result.following.length == 0){
                res.status(200).send([])
            }else{
                result.following.forEach(async (fol)=>{
                    await db.collection('user').findOne({_id:new ObjectId(fol)},(err,result)=>{
                        folList.push(result)
                        // console.log(result)
                    })    
                    console.log(fol)  
                    if(result.following.length == folList.length){
                        console.log(folList)  
                        console.log("ok")
                        res.status(200).send(folList)
                    }          
                }
                ) 
            }
            
            // console.log("1")
            // if(result.following.length == folList.length){
            //     res.status(200).send(folList)
            // }
            
        }
        else{
            res.status(400).send("db error")
        }
    })
    // res.status(200).send("rec")
})
app.post('/remFollowing',(req,res)=>{
    console.log("remFollowing")
    const {userid,currUser} = req.body
    console.log(userid,currUser)
    db.collection('user').updateOne({email:`${currUser}`},{$pull:{following:`${userid}`}})
    res.status(200).send("removed")
})
app.listen(PORT,()=>{
    console.log(`server up on ${PORT}`)
})