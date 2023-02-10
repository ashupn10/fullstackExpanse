const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
exports.forgotpassword=(req,res,next)=>{
    res.status(200).json({success:true,message:'you can update new password'})
}