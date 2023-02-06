const list=document.getElementById('list');
// const user=document.getElementById('username')
const form=document.getElementById('form');
document.addEventListener('DOMContentLoaded',showExpanses);
form.addEventListener('submit',postExpanses);
function deleteExpanse(id){
    const token=localStorage.getItem('token');
    axios.delete('http://localhost:3000/index/'+`${id}`,{headers:{'Authentication':token}})
    .then(()=>{
        console.log('This expanse is deleted');
        window.location.replace('http://localhost:3000/index');
    })
}
function postExpanses(){
    const expanse=document.getElementById('Expanse').value;
    const description=document.getElementById('description').value;
    const category=document.getElementById('category').value;
    const data={
        expanse:expanse,
        description:description,
        category:category,
    }
    const token=localStorage.getItem('token');
    axios.post('http://localhost:3000/index',data,{headers:{'Authentication':token}})
    .then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
}
function showExpanses(){
    const token=localStorage.getItem('token');
    // console.log(token);
    axios.get('http://localhost:3000/index/fetch',{headers:{'Authentication':token}})
    .then(res=>{
        // result=JSON.parse(result.data);
        // console.log(res.data);
        const table=document.getElementById('table');
        res.data.result.forEach(element => {
            let category=document.getElementById('categoryDiv');
            let Username=document.getElementById('username');
            Username.innerText=`Hello! ${res.data.message}`;
            let expanse=document.getElementById('expanseDiv');
            let description=document.getElementById('descriptionDiv');
            let expansediv=document.createElement('div');
            expansediv.innerHTML=element.expanse;
            let categorydiv=document.createElement('div');
            categorydiv.innerHTML=element.category;
            categorydiv.className='align';
            let descriptiondiv=document.createElement('div');
            descriptiondiv.innerHTML=element.description;
            descriptiondiv.className='align';
            let editbtn=document.createElement('button')
            let Deletebtn=document.createElement('button')
            editbtn.innerText='Edit';
            Deletebtn.innerText='Delete';
            editbtn.className='btn';
            Deletebtn.className='btn';
            Deletebtn.addEventListener('click',()=>{
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