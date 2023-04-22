const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const expanseSchema=new Schema({
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    expenses:{
        type:Number,
        required:true,
    },
    userId:{type:Schema.Types.ObjectId,required:true},
})
module.exports=mongoose.model('expense',expanseSchema);

// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const Expanse=sequelize.define('Expanse',{
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     expanse:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//     },
// })
// module.exports=Expanse;