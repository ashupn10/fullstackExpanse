const Razorpay= require('razorpay');
const Expanse=require('../model/expenses');
const User=require('../model/User');


// 'rzp_test_ymshxTVZbrKr6k'
// 'LnUsgIaS6LReW9gap0K4yG5n',
exports.initiatePremium=async (req,res,next)=>{
    try{
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET,
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
        res.status(403).json({message:'something went wrong',error:err});
    }
}
exports.updateTransaction=async (req,res,next)=>{
    try{
        const {payment_id,order_id}=req.body;
        if(payment_id){
            const response=await req.user.updateOrder(payment_id,order_id);
            return res.status(202).json({success:true,message:'Transaction Successful',isPremium:req.user.isPremium});
        }else{
            req.user.order({where:{orderId:order_id}})
            .then(response=>{
                response.update({status:'failed'});
            })
        }
    }catch(err){
        res.status(403).json({error:err,message:'something went wrong'});
    }
}
exports.fetchAll=async (req,res,next)=>{
    try{
        const response=await User.find({},'name totalExpanse')
        // const response=await User.findAll({
        //     attributes:['id','name',[sequelize.fn('sum',sequelize.col('Expanses.expanse')),'total_cost']],
        //     include:[
        //         {
        //             model:Expanse,
        //             attributes:[]
        //         }
        //     ],
        //     group:['id']
        // })
        console.log(response);
        res.json(response);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}
exports.isPremium=(req,res,next)=>{
    try{
        const user=req.user;
        if(user.isPremium){
            return res.status(200).json({success:true,message:'IsPremium',isPremium:true});
        }else{
            return res.status(401).json({success:true,message:'IsnotPremium',isPremium:false});
        }
    }catch(err){
        res.status(500).json(err)
    }
}