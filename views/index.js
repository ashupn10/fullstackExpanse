//  Requirements

const list = document.getElementById('list');
const form = document.getElementById('form');
const rzpButton = document.getElementById('rzp-button');


// Event Listeners.....


document.addEventListener('DOMContentLoaded', showExpanses);
form.addEventListener('submit', postExpanses);
rzpButton.addEventListener('click', initiateTransaction)

// functions for event Listeners....


async function initiateTransaction(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/premium', { headers: { 'Authentication': token } })
    console.log(response);
    var options={
        'key':response.data.key_Id,
        'order_id':response.data.order.id,
        'handler':async function(response){
            await axios.post('http://localhost:3000/premium',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            },{headers:{'Authentication':token}});
            showPremium();
            alert('you are a premium user now');

        }
    }
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',async function(response){
        console.log(response);
        await axios.post('')
        alert('Transaction failed please try again');
    })
}
function deleteExpanse(id) {
    const token = localStorage.getItem('token');
    axios.delete('http://localhost:3000/index/' + `${id}`, { headers: { 'Authentication': token } })
        .then(() => {
            console.log('This expanse is deleted');
            window.location.replace('http://localhost:3000/index');
        })
}
function postExpanses() {
    const expanse = document.getElementById('Expanse').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const data = {
        expanse: expanse,
        description: description,
        category: category,
    }
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/index', data, { headers: { 'Authentication': token } })
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
}
async function showPremium(){
    rzpButton.remove();
    const premium=document.getElementById('isPremium');
    premium.innerText='You are Premium User';
}
function showExpanses() {
    const token = localStorage.getItem('token');
    // console.log(token);
    axios.get('http://localhost:3000/index/fetch', { headers: { 'Authentication': token } })
        .then(res => {
            // result=JSON.parse(result.data);
            // console.log(res.data);
            let Username = document.getElementById('username');
            Username.innerText = `Hello! ${res.data.message}`;
            if(res.data.isPremium) showPremium();
            const table = document.getElementById('table');
            res.data.result.forEach(element => {
                let category = document.getElementById('categoryDiv');
                let expanse = document.getElementById('expanseDiv');
                let description = document.getElementById('descriptionDiv');
                let expansediv = document.createElement('div');
                expansediv.innerHTML = element.expanse;
                let categorydiv = document.createElement('div');
                categorydiv.innerHTML = element.category;
                categorydiv.className = 'align';
                let descriptiondiv = document.createElement('div');
                descriptiondiv.innerHTML = element.description;
                descriptiondiv.className = 'align';
                let editbtn = document.createElement('button')
                let Deletebtn = document.createElement('button')
                editbtn.innerText = 'Edit';
                Deletebtn.innerText = 'Delete';
                editbtn.className = 'btn';
                Deletebtn.className = 'btn';
                Deletebtn.addEventListener('click', () => {
                    deleteExpanse(element.id)
                    window.location.replace('http://localhost:3000/index');
                });
                // editbtn.addEventListener('click',editExpanse,element.id);
                category.appendChild(categorydiv);
                expanse.appendChild(expansediv);
                description.appendChild(descriptiondiv);
                expanse.appendChild(editbtn);
                expanse.appendChild(Deletebtn);
            });

        })
}