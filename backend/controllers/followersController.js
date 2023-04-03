const User = require('../model/users');

const getFollowers = async (req,res) => {
    // console.log('getFollowers')
    // console.log(req.user)
    // const {currUser} = req.user;
    const {currUser} = req.body;
    let followerList = [];

    const result = await User.findOne({email: currUser});

    const cursor = User.find({}).cursor();

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        if(doc.following.includes(result._id.toString())){
            if(result.following.includes(doc._id.toString())){
                followerList.push({doc,b:true})
            } else {
                followerList.push({doc,b:false})
            }
        }
    }
    res.status(200).send(followerList);    
}

// const addFollowing = async (req,res) => {
//     const {userid,currUser} = req.body
//     await User.updateOne({email: currUser},{$push:{following: userid}})
//     res.status(200).send("added")
// }

// const removeFollowing = async (req,res) => {
//         const {userid,currUser} = req.body;
//         await User.updateOne({email:`${currUser}`},{$pull:{following:`${userid}`}});
//         res.status(200).send("removed");
// }
module.exports = {getFollowers}