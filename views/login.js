const form=document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=document.getElementById('Email').value;
    const password=document.getElementById('password').value;
    // const loginDetails=JSON.stringify();
    axios.post('http://localhost:3000/login',{data:{
        "email":email,
        "password":password,
    }})
    .then(result=>{
        if(result.data.success){
            localStorage.setItem('token',`${result.data.token}`);
        }
        else{
            alert(result.message);
        }
    })
    .then(()=>{
        window.location.href='http://localhost:3000/index';
    })
    .catch(err=>console.log(err));
})