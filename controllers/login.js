const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User = require('../model/User');

function generateKeyToken(id){
    return jwt.sign({userId:id},process.env.JWT_TOKEN);
}

exports.getLoginPage=(req,res,next)=>{
    res.sendFile(viewPath+'/login.html');
}
exports.postLoginPage=async (req,res,next)=>{

    try{
        const user=await User.findOne({
            where:{
                email:req.body.data.email.toLowerCase()
            }
        })
        if(user){
            bcrypt.compare(req.body.data.password,user.password,(err,result)=>{
                if(result==true){
                    const userId=generateKeyToken(user.id);
                    res.status(200).json({success:true,message:'user logged in',token:userId});
                }else{
                    return res.status(401).json({success:false,message:'Invalid Password'});
                }
                if(err) console.log(err);
            })
        }
        else{
            return res.status(404).json({success:false,message:'User not found'});
        }
    }catch(err){
        console.log(err);
    }
}