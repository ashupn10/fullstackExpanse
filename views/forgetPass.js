const { TokenExpiredError } = require("jsonwebtoken");

const form=document.getElementById('form');
form.addEventListener('submit',async ()=>{
    const formData = new FormData(form);
    const token=localStorage.getItem('token');
    const promise=await axios.post('http://localhost:3000/password/forgot',formData,{
        headers:{
            'Authentication':token
        }
    })
    console.log(promise);
})