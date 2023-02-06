const express=require('express');
const router=express.Router();
const indexControllers=require('../controllers/index');
const auth=require('../middleware/auth');

router.delete('/:id',auth,indexControllers.deleteIndex);
router.get('/fetch',auth,indexControllers.fetchIndex);
router.get('/',indexControllers.getIndex);
router.post('/',auth,indexControllers.postIndex);


module.exports=router;
