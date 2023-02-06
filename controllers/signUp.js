const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
const bcrypt=require('bcrypt');
const User = require('../model/User');
exports.getSignUpPage = (req, res, next) => {
    res.sendFile(viewPath + '/signUp.html');
}
exports.postSignUpPage = (req, res, next) => {
    // console.log(req.body);
    User.findAll({
        where: {
            email: req.body.Email
        }
    })
        .then(user => {
            if (user.length!=0) {
                res.sendFile(viewPath+'/Existing.html');
            }
            else {
                bcrypt.hash(req.body.password,10,async (err,hash)=>{
                    // console.log(err);
                    await User.create({
                        name: req.body.Name,
                        email: req.body.Email.toLowerCase(),
                        password: hash
                    })
                    .then(()=>console.log('This is Created'))
                    .then(() => res.redirect('/login'))
                    .catch(err => console.log(err));
                })
            }
        })
        .catch(err => console.log(err));
}