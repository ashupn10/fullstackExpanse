const list=document.getElementById('list');
// const user=document.getElementById('username')
document.addEventListener('DOMContentLoaded',showExpanses);

function deleteExpanse(id){
    axios.delete('http://localhost:3000/index/'+`${id}`)
    .then(()=>{
        console.log('This expanse is deleted');
    })
}

function showExpanses(){
    axios.get('http://localhost:3000/index/fetch')
    .then(result=>{
        // result=JSON.parse(result.data);
        console.log(result.data);
        const table=document.getElementById('table');
        result.data.forEach(element => {
            let category=document.getElementById('category');
            let expanse=document.getElementById('expanse');
            let description=document.getElementById('description');
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