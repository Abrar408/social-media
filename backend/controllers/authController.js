const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

const register = async (req, res) => {
    const {user,email,gender,pass} = req.body;

    if(user == '' || email == '' || pass == '') return res.status(400).send('required fields cannot be blank');

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send('please enter a valid email address');    
    
    const result = await User.findOne({email:email}).exec();
    if(result) return res.status(400).send("email already exists");
    hashedpass= await bcrypt.hash(pass,10);
    await User.create({username:user,email:email,password:hashedpass,gender:gender});
    res.status(200).send("user registered successfully");
    
}
const login = async (req, res) => {
    const {email,pass} = req.body;
    if(email == '' || pass == '') return res.status(400).send('required fields cannot be blank');

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send('please enter a valid email address'); 

    const result = await User.findOne({email}).exec();
    // console.log(result);
    if(!result) return res.status(400).send('Incorrect username or password');
    const checkPassword = async () => {
        const isMatch = await bcrypt.compare(pass,result.password);
        if(!isMatch) return res.status(400).send('Incorrect username or password');
        const accessToken = jwt.sign(
            { "email":result.email },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1h'}
        );
        const refreshToken = jwt.sign(
            { "email":result.email },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        await User.updateOne({email:result.email},{$set:{refreshToken}});
        res.cookie('jwt',refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite:'none', secure: true});
        res.status(200).json({result,accessToken}); 
    }
    checkPassword();
    
       
}

module.exports = {register,login}