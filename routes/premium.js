const express=require('express');
const router=express.Router();
const premiumController=require('../controllers/premium');
const auth = require('../middleware/auth');


router.get('/isPremium',auth,premiumController.isPremium);
router.get('/fetchAll',auth,premiumController.fetchAll);
router.get('/',auth,premiumController.initiatePremium);
router.post('/',auth,premiumController.updateTransaction);

module.exports=router;