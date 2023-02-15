const AWS=require('aws-sdk');
const path=require('path');
require('dotenv').config();
const viewPath = path.join(__dirname, '..', 'views');


const uploadS3=(filename,data)=>{
    try{
        const BUCKET_NAME='expansetracker';
        const IAM_USER_KEY=process.env.IAM_USER_KEY;
        const IAM_USER_SECRET=process.env.IAM_USER_SECRET;
        const newawsbucket=new AWS.S3({
            accessKeyId:IAM_USER_KEY,
            secretAccessKey:IAM_USER_SECRET,
            Bucket:BUCKET_NAME,
        });
        var Params={
            Bucket:'expansetracker',
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            newawsbucket.upload(Params,(err,s3response)=>{
                if(err){
                    console.log(err);
                    console.log('Something went wrong');
                    reject(err);
                }else{
                    console.log(s3response);
                    const url=s3response.Location;
                    console.log('Successful');
                    resolve(url);
                }
            })
        })
    
    
    }catch(err){
        console.log(err);
    }
}
exports.downloadReport=async (req,res,next)=>{
    try{
        const expanses=await req.user.getExpanses();
        const jsonExpanse=JSON.stringify(expanses);
        const filename=`expanse${req.user.id}.txt`;
        const fileUrl=await uploadS3(filename,jsonExpanse);
        console.log(fileUrl);
        const response=await req.user.createDownloadedReport({url:fileUrl});
        res.status(200).json({data:fileUrl,success:true});
    }catch(err){

    }
}
exports.sendReportFile=(req,res,next)=>{
    res.status(200).sendFile(viewPath+'/Report.html');
}
exports.downloadLink=async (req,res,next)=>{
    try{
        const User=req.user;
        const reportLink=await User.getDownloadedReports()
        res.status(200).json({success:true,data:reportLink});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
}