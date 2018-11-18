const getBtn = document.querySelector('#get_JSON');
getBtn.addEventListener('click', () => {
    fetch(`/our.json`, {
        method: `GET`})
        .then((respose) => {
            respose.json()
                .then((data) =>{
                    console.log(data)
                })     
        })
        .catch((err) => {
            console.log(err)
        })
})


// fetch(`/our.json`, {
//     method: `POST`})
//     .then((respose) => {
//         respose.json()
//             .then((data) =>{
//                 console.log(data)
//             })     
//     })
//     .catch((err) => {
//         console.log(err)
//     })