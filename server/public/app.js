const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')

//-------- Activity 2 --------
function sendMessage(e) {
    e.preventDefault()  // prevents the page from reloading after message is sent
    const input = document.querySelector('input')
    if (input.value) {
        socket.emit('message', input.value)    //sends a message to the server
        input.value = ""
    }
    input.focus()
}
//----------------------------

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages
socket.on("message", (data) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5))
})


socket.on("activity", (name) => {
    let activityTimer
    activity.textContent = `${name} is typing...`

    // Clear after 3 seconds 
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})