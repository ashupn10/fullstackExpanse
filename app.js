// all packages are imported here

const express=require('express');
const request = require('request');
const bodyParser=require('body-parser');

//all routes are imported here
const signUpRouter=require('./routes/signUp');
const loginRouter=require('./routes/login');
const indexRouter=require('./routes/index');
const premiumRouter=require('./routes/premium');
const passwordRouter=require('./routes/password');

// all models are imported here
const User=require('./model/User');
const Expanse=require('./model/expanses');
const Order=require('./model/order');
const forgotPassword=require('./model/forgotpasswordrequests');
// const sequelize=require('sequelize');

// Database imported here
const Sequelize=require('./util/database');
const app=express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static('views'));


app.use('/report',(req,res,next)=>{
    res.sendFile('/home/codename/sharpener/DaYExpanse/views/Report.html');
})
app.use('/password',passwordRouter);
app.use('/signUp',signUpRouter);
app.use('/login',loginRouter);
app.use('/index',indexRouter);
app.use('/premium',premiumRouter);
User.hasMany(Expanse);
Expanse.belongsTo(User,{
    onDelete:'SET DEFAULT'
});

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

Sequelize.sync()
// Sequelize.sync({force:true})
.then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err));