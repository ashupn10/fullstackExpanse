const User=require('../model/User');

exports.forgotpassword=async (req,res,next)=>{
    try{
        const email=req.body.email;
        const user=await User.findOne({
            where:{
                email:email
            }
        })
        console.log(user);
        const result=await user.createForgotPassword()
        console.log(result.id);
        return res.json({success:true,message:`hello world`,result:result.id});
    }catch(err){
        console.log(err);
    }
}

exports.resetPassword=(req,res,next)=>{
    console.log(req.params);
}