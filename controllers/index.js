const path = require('path');
const User=require('../model/User');
const Expanse=require('../model/expanses');
const viewPath = path.join(__dirname, '..', 'views');

exports.getIndex=(req,res,next)=>{
    res.sendFile(viewPath+'/index.html');
}
exports.postIndex=(req,res,next)=>{
    Expanse.create({
        category:req.body.category,
        description:req.body.description,
        expanse:req.body.Expanse
    })
    .then(()=>{
        res.redirect('/index');
    })
}
exports.fetchIndex=(req,res,next)=>{
    Expanse.findAll()
    .then(result=>{
        res.json(result);
    })
}
exports.deleteIndex=(req,res,next)=>{
    let id=req.params.id;
    console.log(id);
    Expanse.destroy({
        where:{
            id:id
        }
    })
    .then(()=>{
        console.log('deleted');
    })
    .catch(err=>console.log(err));
}