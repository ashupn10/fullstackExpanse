//project_directory/emailBuilder.js
require('dotenv').config();
var SibApiV3Sdk = require('sib-api-v3-sdk');
console.log(process.env.SMTP_KEY);
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SMTP_KEY;

new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
  {
    'subject':'Hello from the Node SDK!',
    'sender' : {'email':'ashupn10@gmail.com', 'name':'Ashutosh Mishra'},
    'replyTo' : {'email':'ashupn10@gmail.com', 'name':'Ashutosh Mishra'},
    'to' : [{'name': 'Ashutosh Mishra', 'email':'yourworkdoneby@gmail.com'}],
    'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
    'params' : {'bodyMessage':'Made just for you!'}
  }
).then(function(data) {
  console.log(data);
}, function(error) {
  console.error(error);
});