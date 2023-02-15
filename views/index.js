//  Requirements

const list = document.getElementById('list');
const form = document.getElementById('form');
const rzpButton = document.getElementById('rzp-button');
const report=document.getElementById('report');
const currentPage=document.getElementById('current');
const nextPage=document.getElementById('next');
const previosPage=document.getElementById('previous');
const perPage=document.getElementById('itemsPerPage');
var currentPagevalue=parseInt(1);
// Event Listeners.....


document.addEventListener('DOMContentLoaded', ()=>{
    showExpanses(currentPagevalue);
});
perPage.addEventListener('submit',(e)=>{
    e.preventDefault();
    let val=document.getElementById('inputperpage').value;
    localStorage.setItem('ItemPerPage',val);
    showExpanses(1);
})
form.addEventListener('submit', postExpanses);
rzpButton.addEventListener('click', initiateTransaction);
report.addEventListener('click',showAlert);
currentPage.addEventListener('click',()=>{
    showExpanses(currentPagevalue);
})
nextPage.addEventListener('click',()=>{
    showExpanses(currentPagevalue+1);
    currentPagevalue=currentPagevalue+1;
    currentPage.innerText=currentPagevalue;
})
previosPage.addEventListener('click',()=>{
    showExpanses(currentPagevalue-1);
    currentPagevalue=currentPagevalue-1;
    currentPage.innerText=currentPagevalue;
})
// functions for event Listeners....
function removeElementByClassName(tagName){
    var element = document.getElementsByClassName(tagName);
    for (index = element.length - 1; index >= 0; index--){
        element[index].parentNode.removeChild(element[index]);
    }
}
async function showReport(){
    window.location.href='http://localhost:3000/report';
}
function showAlert(){
    // return report.href='http://localhost:3000/index';
    alert('You are not a premium user');
    report.href='http://localhost:3000/index';
}
async function initiateTransaction(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/premium', { headers: { 'Authentication': token } })
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
    report.removeEventListener('click',showAlert);
    report.addEventListener('click',showReport);
    const premium=document.getElementById('isPremium');
    premium.innerText='You are Premium User';
    const token=localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/premium/fetchAll',{headers:{'Authentication':token}});
    const leaderBoard=document.getElementById('leaderBoard');
    leaderBoard.innerHTML='<button id="ldb_btn">Show leaderboard</button>';
    leaderBoard.addEventListener('click',()=>{
        showLeaderBoard(response.data);
    })
}
function compareExpanse(a,b){
    return b.totalExpanse-a.totalExpanse;
}
async function showLeaderBoard(data){
    const leaderBoard=document.getElementById('leaderBoard');
    const list= document.createElement('ul');
    list.className='totalexpanse-list';
    data.forEach(user=>{
        const listItem=document.createElement('li');
        listItem.innerText=`Name:${user.name}  TotalExpanse:${user.total_cost}`;
        list.appendChild(listItem);
    })
    const btn=document.getElementById('ldb_btn');
    btn.remove();
    leaderBoard.appendChild(list);
}
function showExpanses(page) {
    let itemsperPage=localStorage.getItem('ItemPerPage');
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/index/fetch/'+`${page}/${itemsperPage}`, { headers: { 'Authentication': token } })
        .then(res => {
            removeElementByClassName('row');
            const Totalpage=document.getElementById('totalPage');
            Totalpage.innerText=`Total Page ${res.data.totalpage}`;
            let Username = document.getElementById('username');
            Username.innerText = `Hello! ${res.data.message}`;
            if(res.data.isPremium) showPremium();
            const table = document.getElementById('table');
            res.data.result.forEach(element => {
                let row=document.createElement('tr');
                row.className='row';
                let expansedata=document.createElement('td');
                let descriptiondata=document.createElement('td');
                let categorydata=document.createElement('td');
                expansedata.innerText=element.expanse;
                descriptiondata.innerText=element.description;
                categorydata.innerText=element.category;
                row.appendChild(categorydata);
                row.appendChild(descriptiondata);
                row.appendChild(expansedata);
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
                row.appendChild(editbtn);
                row.appendChild(Deletebtn);
                table.appendChild(row);
            });

        })
}