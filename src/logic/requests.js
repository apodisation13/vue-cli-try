function try_post(body, url) {
    
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(result => {
            alert('Успешно')
        })
}

function try_delete(url){
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
       alert('успешно удалили деку');
    }).catch(err => {
        alert(err)
    });
}

export { try_post, try_delete }
