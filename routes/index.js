const express=require('express');
const router=express.Router();
const indexControllers=require('../controllers/index');
const auth=require('../middleware/auth');

// router.put('/edit/:id',auth,indexControllers.editExpanse);
// router.delete('/delete/:id',auth,indexControllers.deleteIndex);
// router.get('/fetch/:page/:itemsperPage',auth,indexControllers.fetchIndex);
router.get('/',indexControllers.getIndex);
router.post('/',auth,indexControllers.postIndex);


module.exports=router;
