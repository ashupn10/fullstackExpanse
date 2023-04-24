const mongoose=require('mongoose');
const mongoDb=require('mongodb')
const Expanse=require('./expenses');
const { deleteOne } = require('./expenses');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    isPremium:{
        type:Boolean,
        required:true,
    },
    totalExpanse:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    expanses: [{ type: Schema.Types.ObjectId, ref: 'expense' }],
    order:[{
        orderId:{type:String},
        paymentId:{type:String},
        status:{type:String},
    }],
    reports:[{url:{type:String}}],
    passwords:[{password:{type:String,isActive:Boolean}}]
})
userSchema.methods.createOrder=async function(body){
    this.order.push({orderId:body.orderId,status:body.status});
    await this.save();
}
userSchema.methods.updateOrder=async function(payment_id,order_id){
    const orderIndex=this.order.findIndex(order=>{
        return order.orderId===order_id
    })
    this.order[orderIndex].paymentId=payment_id;
    this.order[orderIndex].status='successful'
    this.isPremium=true;
    await this.save();
}
userSchema.methods.getExpanses=async function(){
    const expanses=this.expanses.populate();
    return expanses;
}
userSchema.methods.createDownloadedReport=async function(link){
    this.reports.push(link.url);
    await this.save();
}
userSchema.methods.getDownloadedReport=async function(){
    if(this.reports.length>0){
        return this.report[this.report.length-1];
    }
}
userSchema.methods.addExpense=async function(expansebody){
    console.log(expansebody);
    const expanse=new Expanse({
        category:expansebody.category,
        description:expansebody.description,
        expense:parseInt(expansebody.expanse),
        userId:this
    })
    await expanse.save();
    console.log(expanse._id);
    this.totalExpanse=parseInt(this.totalExpanse)+parseInt(expansebody.expanse);
    this.expanses.push(expanse);
    await this.save();
}
userSchema.methods.deleteExpense=async function(id){
    const expanseIndex=this.expanses.findIndex(expanse=>{
        return expanse._id.toString()==new mongoDb.ObjectId(id).toString();
    })
    await Expanse.deleteOne({_id:id});
    this.expanses.splice(expanseIndex,1);
    this.save();
}

module.exports=mongoose.model('user',userSchema);
// module.exports=User;

// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');

// const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true,
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },

// })
