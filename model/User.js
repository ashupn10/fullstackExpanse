const mongoose=require('mongoose');
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
    expanses: [{ type: Schema.Types.ObjectId, ref: 'expense' }]
})
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
