const User = require('../model/users');

const getFollowing = async (req,res) => {
    const {currUser} = req.body;
    let followingList = [];
    const result = await User.findOne({email: currUser});
    if(!result) return res.status(500);
    if(result.following.length == 0) return res.status(200).send([]);
    await result.following.forEach(async (following) => {
        const new_result = await User.findOne({_id: following.toString()});
        followingList.push(new_result);
        if(followingList.length == result.following.length){
            res.status(200).send(followingList);
        }
    });
    
}

const addFollowing = async (req,res) => {
    const {userid,currUser} = req.body
    await User.updateOne({email: currUser},{$push:{following: userid}})
    res.status(200).send("added")
}

const removeFollowing = async (req,res) => {
        const {userid,currUser} = req.body;
        await User.updateOne({email:`${currUser}`},{$pull:{following:`${userid}`}});
        res.status(200).send("removed");
}
module.exports = {getFollowing,addFollowing,removeFollowing}