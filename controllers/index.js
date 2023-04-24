const path = require('path');
const Expanse=require('../model/expenses');
const User=require('../model/User');
const viewPath = path.join(__dirname, '..', 'views');

exports.getIndex=(req,res,next)=>{
    res.sendFile(viewPath+'/index.html');
}
exports.postIndex=async (req,res,next)=>{
    console.log(req.user)
    try{
        await req.user.addExpense(req.body);
        res.redirect('/index');
    }catch(err){
        console.log(err);
    }
}
exports.fetchIndex=async (req,res,next)=>{
    try{
        const user=req.user;
        const page=parseInt(req.params.page);
        const itemsperPage=parseInt(req.params.itemsperPage);
        let totalitems=await user.expanses.length;
        totalpage=Math.ceil(totalitems/itemsperPage);
        const result=await Expanse.find({userId:req.user._id})
        .limit(itemsperPage * 1)
        .skip((page - 1) * itemsperPage);
        res.json({success:true,result,totalpage:totalpage,message:`${user.name}`,isPremium:user.isPremium});
    }catch(err){
        console.log(err);
    }
}
exports.deleteIndex=async (req,res,next)=>{
    try{
        await req.user.deleteExpense(req.params.id);
        res.status(200).json({success:true})
    }catch(err){
        console.log(err);
    }
}
