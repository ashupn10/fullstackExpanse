const express=require('express');
const router=express.Router();
const indexControllers=require('../controllers/index');

router.delete('/:id',indexControllers.deleteIndex);
router.get('/fetch',indexControllers.fetchIndex);
router.get('/',indexControllers.getIndex);
router.post('/',indexControllers.postIndex);


module.exports=router;
