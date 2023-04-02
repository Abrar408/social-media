const User = require('../model/users');
const {ObjectId} = require('bson');

const getUserList = async (req, res) => {
    const {input,userid} = req.body;
    const regex = new RegExp(`${input}`,"i");
    let users = [];
    let currUser = [];
    const result = await User.findOne({email: userid});
    if(!result) return res.status(500).send('user not found');
    currUser = result.following;
    const cursor = User.find({username:regex}).cursor();

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        if(doc.email != userid){
            if(currUser.includes(doc._id.toString())){
                users.push({doc,b:true});
            }
            else{
                users.push({doc,b:false});
            }
        }
    }
    res.status(200).send(users) ;   
}

module.exports = {getUserList}