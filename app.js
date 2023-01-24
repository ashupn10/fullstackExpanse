const express=require('express');
const bodyParser=require('body-parser');
const loginRouter=require('./routes/login');
const app=express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use('/signUp',loginRouter);

app.listen(3000);