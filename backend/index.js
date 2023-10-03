const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
})

// users
users = []

io.on('connection', (socket) => {
    // user joins a room
    socket.on('join', ({username}) => {
        if(username in users) {
            // username already picked
        }
        users.push(username)
        console.log('Updated users list:', users)
        io.emit('userList', {users})
    })

    // handle incoming messages
    socket.on('chatMessage', ({message, username}) => {
        io.emit('newMessage', {message, username})
    })

    // handle user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

server.listen(1234, () => {
    console.log("[*] Server is up and running ...")
})
