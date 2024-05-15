const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')

//-------- Activity 2 --------
// We want to send back the message we received from the single client, back to the server
function sendMessage(e) {
    e.preventDefault()  // Prevents the page from reloading after message is sent
    const input = document.querySelector('input')
    if (input.value) {
        // Hint: Emphasis on the SINGLE client
        input.value = ""
    }
    input.focus()      // Sets focus back to the input field
}
//----------------------------

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages sent back from server
socket.on("message", (data) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)    //Adds it to the list of messages 
})
// When a key is pressed, sends back name of event and ID of socket back to server
msgInput.addEventListener('keypress', () => {   
    socket.emit('activity', socket.id.substring(0, 5))
})

// Listens for activity event to occur
socket.on("activity", (name) => {
    let activityTimer
    activity.textContent = `${name} is typing...`

    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})