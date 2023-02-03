const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Expanse=sequelize.define('Expanse',{
    category:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    expanse:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
})
module.exports=Expanse;