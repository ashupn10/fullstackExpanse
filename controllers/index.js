const path = require('path');
const Expanse=require('../model/expenses');
const viewPath = path.join(__dirname, '..', 'views');

exports.getIndex=(req,res,next)=>{
    res.sendFile(viewPath+'/index.html');
}
exports.postIndex=async (req,res,next)=>{
    try{
        const promise1= Expanse.save({
            category:req.body.category,
            description:req.body.description,
            expanse:req.body.expanse,
            userId:req.user,
        });
        console.log('These are Expanses',req.body);
        const totalExpanse=parseInt(req.user.totalExpanse)+parseInt(req.body.expanse);
        const promise2=req.user.save({totalExpanse:totalExpanse});
        Promise.all([promise1,promise2])
        .then(()=>{
            res.redirect('/index');
        })
    }catch(err){
        console.log(err);
    }
}
exports.fetchIndex=async (req,res,next)=>{
    try{
        const user=req.user;
        console.log(req.params);
        const page=parseInt(req.params.page);
        const itemsperPage=parseInt(req.params.itemsperPage);
        let totalitems=await req.user.countExpanses();
        console.log(totalitems)
        totalpage=Math.ceil(totalitems/itemsperPage);
        const result=await user.getExpanses({offset:(page-1)*itemsperPage,limit:itemsperPage});
        res.json({success:true,result,totalpage:totalpage,message:`${user.name}`,isPremium:user.isPremium});
    }catch(err){
        console.log(err);
    }
}
exports.deleteIndex=async (req,res,next)=>{
    try{
        const id=req.params.id;
        const user=req.user;
        const response=await user.getExpanses({
            where:{
                id:id
            }
        })
        await Expanse.destroy({
                where:{
                    Id:response[0].id
                }
            })
        console.log('deleted');
        res.status(200).json({success:true})
    }catch(err){
        console.log(err);
    }
}
exports.editExpanse=async (req,res,next)=>{
    try{
        const Id=req.params.id;
        const user=req.user;
        const response=await user.getExpanses({
            where:{
                id:Id
            }
        })
        await Expanse.update({where:{
            id:response[0].id
        }})
        res.status(200).json({success:true,message:'Expanse Updated'})
    }catch(err){
        throw new Error(err);
    }
}