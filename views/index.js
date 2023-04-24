//  Requirements

const list = document.getElementById('list');
const form = document.getElementById('form');
const rzpButton = document.getElementById('rzp-button');
const report = document.getElementById('report');
const currentPage = document.getElementById('current');
const nextPage = document.getElementById('next');
const previosPage = document.getElementById('previous');
const perPage = document.getElementById('itemsPerPage');
const table = document.getElementById('Leaderboard_table');
const logout=document.getElementById('logout');
// Event Listeners.....

logout.addEventListener('click',()=>{
    localStorage.removeItem('token');
})
document.addEventListener('DOMContentLoaded', () => {
    showExpanses(1);
});
perPage.addEventListener('submit', (e) => {
    e.preventDefault();
    let val = document.getElementById('inputperpage').value;
    localStorage.setItem('ItemPerPage', val);
    showExpanses(1);
})
form.addEventListener('submit', postExpanses);
rzpButton.addEventListener('click', initiateTransaction);
report.addEventListener('click', showAlert);
nextPage.addEventListener('click', () => {
    showExpanses(parseInt(currentPage.innerText) + 1);
    currentPage.innerText = `${parseInt(currentPage.innerText) + 1}`;
})
previosPage.addEventListener('click', () => {
    showExpanses(+currentPage.innerText - 1);
    currentPage.innerText = `${parseInt(currentPage.innerText) - 1}`;
})
// functions for event Listeners....
function removeElementByClassName(tagName) {
    var element = document.getElementsByClassName(tagName);
    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }
}
async function showReport() {
    window.location.href = 'http://localhost:3000/report';
}
function showAlert() {
    // return report.href='http://localhost:3000/index';
    alert('You are not a premium user');
    report.href = 'http://localhost:3000/index';
}
async function initiateTransaction(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/premium', { headers: { 'Authentication': token } })
    var options = {
        'key': response.data.key_Id,
        'order_id': response.data.order.id,
        'handler': async function (response) {
            await axios.post('http://localhost:3000/premium', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            }, { headers: { 'Authentication': token } });
            showPremium();
            alert('you are a premium user now');

        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed', async function (response) {
        console.log(response);
        await axios.post('')
        alert('Transaction failed please try again');
    })
}
async function deleteExpanse(id) {
    const token = localStorage.getItem('token');
    await axios.delete('http://localhost:3000/index/delete/' + `${id}`, { headers: { 'Authentication': token } })
}

function postExpanses(e) {
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

async function showPremium() {
    rzpButton.remove();
    report.removeEventListener('click', showAlert);
    report.addEventListener('click', showReport);
    const premium = document.getElementById('isPremium');
    premium.innerText = 'You are Premium User';
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/premium/fetchAll', { headers: { 'Authentication': token } });
    const leaderBoard = document.getElementById('leaderBoard');
    leaderBoard.innerHTML = '<button id="ldb_btn">Show leaderboard</button>';
    const ldb_btn = document.getElementById('ldb_btn');
    ldb_btn.addEventListener('click', () => {
        showLeaderBoard(response.data);
    })
}
function compareExpanse(a, b) {
    return b.totalExpanse - a.totalExpanse;
}
function showLeaderBoard(data) {

    data.forEach(user => {
        const list = document.createElement('tr');
        const listItem1 = document.createElement('td');
        const listItem2 = document.createElement('td');

        listItem1.innerText = user.name;
        listItem2.innerText = user.totalExpanse;
        list.appendChild(listItem1);
        list.appendChild(listItem2);
        table.appendChild(list);
    })
    const btn = document.getElementById('ldb_btn');
    btn.remove();
}
async function showExpanses(page = 1) {
    let itemsperPage = localStorage.getItem('ItemPerPage') ? localStorage.getItem('ItemPerPage') : 5;
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/index/fetch/' + `${page}/${itemsperPage}`, { headers: { 'Authentication': token } })
    removeElementByClassName('row');
    const Totalpage = document.getElementById('totalPage');
    Totalpage.innerText = `Total Page ${res.data.totalpage}`;
    let Username = document.getElementById('username');
    Username.innerText = `Hello! ${res.data.message}`;
    if (res.data.isPremium) showPremium();
    const table = document.getElementById('table');
    res.data.result.forEach(element => {
        let row = document.createElement('tr');
        row.className = 'row';
        let expansedata = document.createElement('td');
        let descriptiondata = document.createElement('td');
        let categorydata = document.createElement('td');
        expansedata.innerText = element.expense;
        descriptiondata.innerText = element.description;
        categorydata.innerText = element.category;
        row.appendChild(categorydata);
        row.appendChild(descriptiondata);
        row.appendChild(expansedata);
        let editbtn = document.createElement('button')
        let Deletebtn = document.createElement('button')
        editbtn.innerText = 'Edit';
        Deletebtn.innerText = 'Delete';
        editbtn.className = 'btn';
        Deletebtn.className = 'btn';
        Deletebtn.addEventListener('click', async (e) => {
            e.target.parentNode.remove();
            deleteExpanse(element._id);
        });
        editbtn.addEventListener('click',async(e)=>{
            const list=e.target.parentNode;
            const listItem=list.cells;
            document.getElementById('Expanse').value=listItem[2].innerText;
            document.getElementById('category').value=listItem[0].innerText;
            document.getElementById('description').value=listItem[1].innerText;
            list.remove();
            deleteExpanse(element._id);
        })
        row.appendChild(editbtn);
        row.appendChild(Deletebtn);
        table.appendChild(row);
    });
    previosPage.disabled = false;
    nextPage.disabled = false;
    EnablePagination(+currentPage.innerText, res.data.totalpage)
}

function EnablePagination(page, totalPage) {
    if (page == 1 && totalPage == 1) {
        previosPage.disabled = true;
        nextPage.disabled = true;
    }
    else if (page == 1 && totalPage > 1) {
        previosPage.disabled = true;
    } else if (page == totalPage) {
        nextPage.disabled = true;
    }
}