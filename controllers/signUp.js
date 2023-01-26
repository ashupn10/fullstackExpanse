const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
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
                User.create({
                    name: req.body.Name,
                    email: req.body.Email,
                    password: req.body.password
                })
                .then(()=>console.log('This is Created'))
                .then(() => res.redirect('/login'))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}