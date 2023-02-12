const express=require('express');
const passwordcontroller=require('../controllers/forgot');

const router=express.Router();

router.use('/reset/:uuid',passwordcontroller.resetPassword);
router.post('/forgot',passwordcontroller.forgotpassword);

module.exports=router;