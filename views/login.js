// Requires

const form = document.getElementById('form');
// const forgotbtn=document.getElementById('forgot');

// // Event Listeners
// forgotbtn.addEventListener('click',(e)=>{
//     window.location.href='http://localhost:3000/forgetPass.html';
// })
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('Email').value;
    const password = document.getElementById('password').value;
    // const loginDetails=JSON.stringify();
    const result = await axios.post('http://localhost:3000/login', {
        data: {
            "email": email,
            "password": password,
        }
    })
    if (result.data.success) {
        localStorage.setItem('token', `${result.data.token}`);
        window.location.href = 'http://localhost:3000/index';
        alert('You are logged in');
    }
    else {
        alert(result.message);
    }
})