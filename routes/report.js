const express=require('express');
const reportController=require('../controllers/report.js');
const auth = require('../middleware/auth.js');


const router=express.Router();

router.get('/downloadlink',auth,reportController.downloadLink);
router.get('/download',auth,reportController.downloadReport);
router.get('/',reportController.sendReportFile);

module.exports=router;