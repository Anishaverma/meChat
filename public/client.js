// const io = require('socket.io-client')
const socket = io();
const input = document.getElementById('input');
const btn = document.getElementById('send-btn');
const output = document.getElementById('output')
var typing=false;
var timeout=undefined;
var user;
// const main = document.getElementById('main');
const main = document.querySelector('.card-body')

const appendText = (message, position) => {
    const messageText = document.createElement('div');
    messageText.innerText = message,
        messageText.classList.add(position),
        main.appendChild(messageText)
}

const addUser = (message, position) => {
    const messageText = document.createElement('span');
    messageText.innerText = message,
        messageText.classList.add(position),
        main.appendChild(messageText)

}
const userName = prompt(`Enter your name`);
socket.emit('new-user-added', userName)
socket.on('user-added', userName => {
    console.log('user is adedd')
    console.log(userName);
    addUser(`${userName} added to the group`, 'center');
}) 

btn.addEventListener('click', () => {
    inputMessage = input.value;
    appendText(`You : ${inputMessage}`, 'right')
    socket.emit('send', inputMessage)
    input.value = ""
    output.innerHTML = ''
})

socket.on('recieve', (data) => {
    console.log(data);
    appendText(`${data.name} : ${data.message}`, 'left')
})

input.addEventListener('keypress' , () =>{
    console.log('user is typing')
    socket.on('typing', data=>{
        output.innerHTML = '<p><em>' + data.name + ' is typing a message....</em></p>'
    })
})

