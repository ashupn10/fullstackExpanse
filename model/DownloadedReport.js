const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const DownloadedReport=sequelize.define('downloadedReport',{
    url:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});
module.exports=DownloadedReport;