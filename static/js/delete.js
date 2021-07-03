const deleteBtn = document.querySelector('a.btn-danger');
deleteBtn.addEventListener('click', (e)=>{
    const url = `/nodeblogapi/delete-blogs/${deleteBtn.dataset.id}`;

    fetch(url,{
        method: 'DELETE'
    }).then((response)=> response.json()).then(data => location.assign(`${data.redirect}`)).catch(err => console.log(err));
});