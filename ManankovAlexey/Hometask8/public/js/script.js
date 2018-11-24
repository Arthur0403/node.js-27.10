window.onload = function() {
    var $groupItem = document.querySelector('.list-group');
    var $text = document.querySelector('#taskText');
    var $send = document.querySelector('#send');
    var socket = io.connect('http://localhost:8080');

    $send.addEventListener('click', (event) => {
        event.preventDefault();
        socket.emit('message', {
            text: $text
        })
    })

    socket.on('change', (changes) => {
        var listGroup = document.createElement('div');
        listGroup.classList.add('list-group-item');
        if(changes.completed !== false) {
            listGroup.innerHTML = 
        `<span>${changes.text}</span>
            <div class="buttons">
                <button type="submit" class="btn btn-outline-secondary complete" value="${changes.id}" name="complete">Завершить</button>
                <button type="submit" class="btn btn-outline-danger delete" value="${changes.id}" name="delete">Удалить</button>
            </div>`
        }
        
    })    
}