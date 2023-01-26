const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
const User = require('../model/User');

exports.getLoginPage=(req,res,next)=>{
    res.sendFile(viewPath+'/login.html');
}