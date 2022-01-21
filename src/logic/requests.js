import axios from "axios";
import store from "@/store";


// гет запрос с добавлением в стор!
function get(url, commit_name) {
    axios.get(url)
      .then(function (response) {
        store.commit(commit_name, response.data)
      })
}


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


// не использую пока
// async function get2(url) {
//     let response = await axios.get(url)
//     alert(response.data[0].name)
//     return response.data
// }


export { get, try_post, try_delete,  }
