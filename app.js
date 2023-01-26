const express=require('express');
const bodyParser=require('body-parser');
const signUpRouter=require('./routes/signUp');
const loginRouter=require('./routes/login');
// const sequelize=require('sequelize');
const Sequelize=require('./util/database');
const app=express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use('/signUp',signUpRouter);
app.use('/login',loginRouter);
// Sequelize.sync({force:true})
Sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err));