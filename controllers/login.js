const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
const User = require('../model/User');

exports.getLoginPage=(req,res,next)=>{
    res.sendFile(viewPath+'/login.html');
}
exports.postLoginPage=(req,res,next)=>{
    User.findAll({
        where:{
            email:req.body.Email.toLowerCase()
        }
    })
    .then(user=>{
        if(user.length!=0){
            if(user[0].password===req.body.password){
                res.status(200).sendFile(viewPath+'/UserFound.html');
            }
            else{
                res.status(401).sendFile(viewPath+'/UserNotFound.html');
            }
        }
        else{
            res.status(404).sendFile(viewPath+'/UserNotExist.html');
        }
    })
    .catch(err=>console.log(err));
}