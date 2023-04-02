const User = require('../model/users');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).send('not found'); 
    const refreshToken = cookies.jwt;
    const result = await User.findOne({refreshToken}).exec();
    if(!result) return res.status(403).send('not found'); 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if(err || result.email !== decoded.email) return res.status(403).send('not found');
            
            const accessToken = jwt.sign(                
                {"email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '60s'}                
            );
            res.status(200).json({result,accessToken});
        }
    )
}
module.exports = {handleRefreshToken}