// all packages are imported here

const express=require('express');
const bodyParser=require('body-parser');
const path = require('path');
const viewPath = path.join(__dirname, '..', 'views');
const morgan=require('morgan');
const fs=require('fs');
const compression=require('compression');
require('dotenv').config();
// const helmet = require('helmet');
const https=require('https');
//all routes are imported here
const signUpRouter=require('./routes/signUp');
const loginRouter=require('./routes/login');
const indexRouter=require('./routes/index');
const premiumRouter=require('./routes/premium');
const passwordRouter=require('./routes/password');
const reportRouter=require('./routes/report');
// all models are imported here
const User=require('./model/User');
const Expanse=require('./model/expanses');
const Order=require('./model/order');
const forgotPassword=require('./model/forgotpasswordrequests');
const DownloadedReport=require('./model/DownloadedReport');
// const sequelize=require('sequelize');
const accessfileStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
// Database imported here
const Sequelize=require('./util/database');
const app=express();
// const privateKey=fs.readFileSync('server.key');
// const certificate=fs.readFileSync('server.cer');
// app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessfileStream}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static('views'));

app.use('/password',passwordRouter);
app.use('/signUp',signUpRouter);
app.use('/login',loginRouter);
app.use('/index',indexRouter);
app.use('/report',reportRouter);
app.use('/premium',premiumRouter);
// app.use('/',(req,res,next)=>{
//     const url=req.url;
    
// });
User.hasMany(Expanse);
Expanse.belongsTo(User,{
    onDelete:'SET DEFAULT'
});

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

User.hasMany(DownloadedReport);
DownloadedReport.belongsTo(User);
Sequelize.sync()
// Sequelize.sync({force:true})
.then(()=>{
    // https.createServer({key:privateKey,cert:certificate},app).listen(3000);
    app.listen(process.env.PORT||3000);
})
.catch(err=>console.log(err));