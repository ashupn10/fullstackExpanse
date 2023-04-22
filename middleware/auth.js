const jwt=require('jsonwebtoken');
const User=require('../model/User');

module.exports = function (req, res, next) {

    const token = req.header('Authentication');
    if (!token) {
        console.log('no token');
        return res.status(401).send('Access denied. No JWT provided.');
    }
    console.log(token);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQzZDBiYTRmOTBlOThkZTM5ZWNmZWEiLCJpYXQiOjE2ODIxODA5MDV9.15fIlA3ISk_KPhhYWogkha1lWxM7jfwr938_KQm6eE0
    try {
        const decoded = jwt.verify(token,process.env.JWT_TOKEN);
        User.findById(decoded.userId).then(user=>{
            // console.log(user);
            req.user=user;
            next();
        })
    }
    catch (err) {
        console.log('invalid Token');
        res.status(400).send('Invalid JWT.');
    }
}
