const Razorpay= require('razorpay');
const Order=require('../model/order');
const Expanse=require('../model/expanses');
const User=require('../model/User');
const sequelize = require('../util/database');
const Sequelize=require('sequelize');

exports.initiatePremium=async (req,res,next)=>{
    try{
        var rzp=new Razorpay({
            key_id:'rzp_test_ymshxTVZbrKr6k',
            key_secret:'LnUsgIaS6LReW9gap0K4yG5n',
        })
        const amount=2000;
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderId:order.id,status:'pending'})
            .then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            })
            .catch(err=>{
                throw new Error(JSON.stringify(err));
            })
        })

    }catch(err){
        console.log(err);
        res.status(403).json({message:'something went wrong',error:err});
    }
}
exports.updateTransaction=async (req,res,next)=>{
    try{
        const {payment_id,order_id}=req.body;
        if(payment_id){
            const response=await Order.findOne({where:{orderId:order_id}})
            const promise1=response.update({paymentId:payment_id,status:'successful'})
            const promise2= req.user.update({isPremium:true});
            Promise.all([promise1,promise2])
            .then(()=>{
                return res.status(202).json({success:true,message:'Transaction Successful',isPremium:req.user.isPremium});
            })
        }else{
            Order.findOne({where:{orderId:order_id}})
            .then(response=>{
                response.update({status:'failed'});
            })
        }
    }catch(err){
        console.log(err);
        res.status(403).json({error:err,message:'something went wrong'});
    }
}
exports.fetchAll=async (req,res,next)=>{
    try{
        const response=await User.findAll({
            attributes:['id','name',[sequelize.fn('sum',sequelize.col('Expanses.expanse')),'total_cost']],
            include:[
                {
                    model:Expanse,
                    attributes:[]
                }
            ],
            group:['id']
        })
        console.log(response);
        res.json(response);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}