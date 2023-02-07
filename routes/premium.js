const express=require('express');
const router=express.Router();
const premiumController=require('../controllers/premium');
const auth = require('../middleware/auth');

router.get('/',auth,premiumController.initiatePremium);

router.post('/',auth,premiumController.updateTransaction);

module.exports=router;