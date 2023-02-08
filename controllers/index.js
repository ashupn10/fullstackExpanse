const path = require('path');
const User=require('../model/User');
const Expanse=require('../model/expanses');
const viewPath = path.join(__dirname, '..', 'views');

exports.getIndex=(req,res,next)=>{
    res.sendFile(viewPath+'/index.html');
}
exports.postIndex=async (req,res,next)=>{
    const promise1= req.user.createExpanse({
        category:req.body.category,
        description:req.body.description,
        expanse:req.body.expanse
    });
    const totalExpanse=parseInt(req.user.totalExpanse)+parseInt(req.body.expanse);
    const promise2=req.user.update({totalExpanse:totalExpanse});
    Promise.all([promise1,promise2])
    .then(()=>{
        res.redirect('/index');
    })
}
exports.fetchIndex=(req,res,next)=>{
    const user=req.user;
    user.getExpanses()
    .then(result=>{
        res.json({success:true,result,message:`${user.name}`,isPremium:user.isPremium});
    })
}
exports.deleteIndex=(req,res,next)=>{
    const id=req.params.id;
    const user=req.user;
    user.getExpanses({
        where:{
            id:id
        }
    })
    .then(res=>{
        // console.log(res);
        Expanse.destroy({
            where:{
                Id:res[0].id
            }
        })
    })
    .then(res=>{
        // console.log(res);
        console.log('deleted');
    })
    .catch(err=>console.log(err));
}