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
users = new Set()

io.on('connection', (socket) => {
    // user joins the chat
    socket.on('join', ({username}) => {
        if(users.has(username)) {
            // username already picked
            socket.emit('usernameError')
        } else {
            users.add(username)
            socket.emit('joinSuccess')
            
            io.emit('userList', {users: Array.from(users)})
            socket.emit('userList', {users: Array.from(users)})
        }
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
