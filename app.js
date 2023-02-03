const express=require('express');
const bodyParser=require('body-parser');
const signUpRouter=require('./routes/signUp');
const loginRouter=require('./routes/login');
const indexRouter=require('./routes/index');
const User=require('./model/User');
const Expanse=require('./model/expanses');
// const sequelize=require('sequelize');
const Sequelize=require('./util/database');
const app=express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('views'));

app.use('/signUp',signUpRouter);
app.use('/login',loginRouter);
app.use('/index',indexRouter);
// Sequelize.sync({force:true})
Expanse.belongsTo(User);
User.hasMany(Expanse);
Sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err));