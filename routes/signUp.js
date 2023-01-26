const express=require('express');
const router=express.Router();
const signUpRoutes=require('../controllers/signUp');

router.get('/',signUpRoutes.getSignUpPage);
router.post('/',signUpRoutes.postSignUpPage);


module.exports=router;
