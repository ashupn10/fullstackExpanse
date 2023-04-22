// requires

const downloadbtn=document.getElementById('Download');
const linkTable=document.getElementById('links_table');


// Event Listeners

document.addEventListener('DOMContentLoaded',showLinks);
downloadbtn.addEventListener('click',downloadReport)



// functions



async function showLinks(){
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/report/downloadlink',{headers:{'Authentication':token}});
    response.data.data.forEach(response=>{
        const linkdata=document.createElement('td');
        const date=document.createElement('td');
        linkdata.innerText=response.url;
        date.innerText=response.createdAt;
        const row=document.createElement('tr');
        row.appendChild(date);
        row.appendChild(linkdata);
        linkTable.appendChild(row);
    })
}
async function downloadReport(){
    const token=localStorage.getItem('token');
    const promise1=await axios.get('http://localhost:3000/report/download',{headers:{'Authentication':token}});
    const a=document.createElement('a');
    a.href=promise1.data.data;
    a.click();
}

