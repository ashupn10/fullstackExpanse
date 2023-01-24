const express=require('express');
const router=express.Router();
const signUpRoutes=require('../controllers/signUp');

router.get('/',signUpRoutes.getSignUpPage);

module.exports=router;
