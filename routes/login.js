const express=require('express');
const router=express.Router();
const loginControllers=require('../controllers/login');

router.get('/',loginControllers.getLoginPage);
// router.post('/',loginControllers.postLoginPage);


module.exports=router;
