const express = require('express');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/socialMedia",{
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to db")
})
const db = mongoose.connection

app.use(cors({
    origin: '*'
}))
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello")
})
app.post('/regUser',(req,res)=>{
    
    db.collection('users').findOne(req.body,(err,result)=>{
        if (err) throw err
        if(result){
            res.status(400).send("email is already registered")            
        }
        else{
            db.collection('users').insertOne(req.body,(err,result)=>{
                
            })
        }
    })
    
})

app.listen(PORT,()=>{
    console.log(`server up on ${PORT}`)
})