const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
const Expanse=require('../model/expanses');
const bcrypt=require('bcrypt');
const User = require('../model/User');

exports.getLoginPage=(req,res,next)=>{
    res.sendFile(viewPath+'/login.html');
}
exports.postLoginPage=(req,res,next)=>{
    User.findOne({
        where:{
            email:req.body.Email.toLowerCase()
        }
    })
    .then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(result==true){
                    res.redirect('/index');
                }else{
                    res.status(401).sendFile(viewPath+'/UserNotFound.html');
                }
                if(err) console.log(err);
            })
        }
        else{
            res.status(404).sendFile(viewPath+'/UserNotExist.html');
        }
    })
    .catch(err=>console.log(err));
}