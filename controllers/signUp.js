const path=require('path');
const viewPath=path.join(__dirname,'..','views');
exports.getSignUpPage=(req,res,next)=>{
    res.sendFile(viewPath+'/signUp.html');
}