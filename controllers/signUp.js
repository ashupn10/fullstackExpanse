const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
const bcrypt = require('bcrypt');
const User = require('../model/User');
exports.getSignUpPage = (req, res, next) => {
    res.sendFile(viewPath + '/signUp.html');
}
exports.postSignUpPage = async (req, res, next) => {
    try{
        const user = await User.findAll({
            where: {
                email: req.body.Email
            }
        })
        if (user.length != 0) {
            res.sendFile(viewPath + '/Existing.html');
        }
        else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if(err){
                    console.log(err);
                }else{
                    await User.create({
                        name: req.body.Name,
                        email: req.body.Email.toLowerCase(),
                        password: hash
                    })
                    console.log('This is Created')
                    res.redirect('/login')
                }
            })
        }
    }catch(err){
        console.log(err);
    }
}