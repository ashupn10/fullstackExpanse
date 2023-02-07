const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Order=sequelize.define('Order',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    orderId:Sequelize.STRING,
    paymentId:Sequelize.STRING,
    status:Sequelize.STRING,
});
module.exports=Order;