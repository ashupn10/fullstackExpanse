const sequelize=require('../util/database');
const Sequelize=require('sequelize');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    isPremium:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
    },
    totalExpanse:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})
module.exports=User;