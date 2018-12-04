window.onload = function() {
    var $groupItem = document.querySelector('.list-group');
    var $text = document.getElementById('taskText');
    var $send = document.querySelector('#send');
    var socket = io.connect('http://localhost:8080');
    socket.emit('loadpage');

    $send.addEventListener('click', (event) => {
        console.log($text.value)
        $send.value = '';
        socket.emit('add', {
            text: $text.value
        })
        event.preventDefault();
    })

    function EventListeners(buttons, type){
        if (type === 'del'){
            buttons.forEach(element => {
                element.addEventListener('click', event => {
                    console.log(element.value)
                    //  socket.emit('delete', element.value)
                })
            })
        } else if (type === 'compl'){
            buttons.forEach(element => {
                element.addEventListener('click', event => {
                    console.log(element.value)
                    // socket.on('modify', element.value)
                })
            })
        }
    }

    socket.on('loadpage', (changes) => {
        console.log('Changes -> ' + changes)
        $groupItem.innerHTML='';
        changes.forEach(element => {
            var listGroup = document.createElement('div');
            listGroup.classList.add('list-group-item');
            if(element.completed !== false) {
                listGroup.classList.add('list-group-item-success');
                listGroup.innerHTML = 
                `<span>${element.text}</span>
                    <div class="buttons">
                        <button type="submit" class="btn btn-outline-secondary complete" value="${element.id}" name="complete">Завершить</button>
                        <button type="submit" class="btn btn-outline-danger delete" value="${element.id}" name="delete">Удалить</button>
                    </div>`
            } else {
                listGroup.innerHTML = 
                `<span>${element.text}</span>
                    <div class="buttons">
                        <button type="submit" class="btn btn-outline-secondary complete" value="${element.id}" name="complete">Завершить</button>
                        <button type="submit" class="btn btn-outline-danger delete" value="${element.id}" name="delete">Удалить</button>
                    </div>`
            }
            $groupItem.appendChild(listGroup);
            EventListeners(document.querySelectorAll('.delete'), 'del');
            EventListeners(document.querySelectorAll('.complete'), 'compl');
        });    
    })    
}