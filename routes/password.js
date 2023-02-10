const express=require('express');
const passwordcontroller=require('../controllers/forgot');
const auth = require('../middleware/auth');
const router=express.Router();

router.get('/forgot',auth,passwordcontroller.forgotpassword)