const { response } = require("express");

const form=document.getElementById('form');
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const email=document.getElementById('Email').value;
    const response=await axios.post('http://localhost:3000/password/forgot',{
        email:email,
    })
    // console.log(response);
    const uuid=response.data.result;
    const resetbtn=document.getElementById('reset');
    resetbtn.addEventListener('click',async ()=>{
        const res=await axios.post('http://localhost:3000/password/forgot/reset/'+uuid)
        
        window.location.replace('http://localhost:3000/password/forgot/reset')
    })
    // console.log(response.data.result);
    
})