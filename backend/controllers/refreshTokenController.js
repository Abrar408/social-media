const User = require('../model/users');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401); 
    const refreshToken = cookies.jwt;
    const result = await User.findOne({refreshToken}).exec();
    if(!result) return res.send(403); 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if(err || result.username !== decoded.username) return res.status(403);
            const accessToken = jwt.sign(                
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}                
            );
            res.json({accessToken});
        }
    )
}
module.exports = {handleRefreshToken}