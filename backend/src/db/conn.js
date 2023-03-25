const mongoose = require('mongoose')
// const db = mongoose.connection
// mongoose.set('strictQuery',false)
mongoose.connect("mongodb://127.0.0.1:27017/socialMedia",{
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to db")
})