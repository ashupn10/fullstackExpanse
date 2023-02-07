const Razorpay= require('razorpay');
const Order=require('../model/order');
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
exports.updateTransaction=(req,res,next)=>{
    try{
        const {payment_id,order_id}=req.body;
        console.log(payment_id,order_id);
        Order.findOne({where:{orderId:order_id}})
        .then(response=>{
            response.update({paymentId:payment_id,status:'successful'})
            .then(()=>{
                return res.status(202).json({success:true,message:'Transaction Successful'});
            })
            .catch(err=>{
                throw new Error(err);
            })
        }).catch(err=>{
            throw new Error(err);
        })
    }catch(err){
        console.log(err);
        res.status(403).json({error:err,message:'something went wrong'});
    }
}