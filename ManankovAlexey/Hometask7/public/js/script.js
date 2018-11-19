const login = document.querySelector('#login');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

login.addEventListener('click', () => {
    fetch(`/our.json`, {
        method: `POST`})
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