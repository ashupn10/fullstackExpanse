const jwt=require('jsonwebtoken');
const User=require('../model/User');

module.exports = function (req, res, next) {

    const token = req.header('Authentication');
    if (!token) {
        console.log('no token');
        return res.status(401).send('Access denied. No JWT provided.');
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_TOKEN);
        User.findByPk(decoded.userId).then(user=>{
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
