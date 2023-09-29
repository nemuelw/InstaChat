const cors = require('cors')
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

// chat rooms
const rooms = {
    room_1: [],
    room_2: []
}

io.on('connection', (socket) => {
    console.log('New user connected')

    // user joins a room
    socket.on('joinRoom', ({username, room}) => {
        socket.join(room)
        rooms[room].push({id: socket.id, username})
        io.to(room).emit('newUser', {username, id:socket.id})
        io.to(room).emit('userList', rooms[room])
    })

    // handle incoming messages
    socket.on('chatMessage', ({message, room}) => {
        io.to(room).emit('newMessage', {message, username:socket.username})
    })

    // handle user disconnects
    socket.on('disConnect', () => {
        console.log('A user disconnected')
        for(const room in rooms) {
            const index = rooms[room].indexOf((user) => user.id === socket.id)
            if(index !== -1) {
                rooms[room].slice(index, 1) // remove user from users list
                io.emit('userList', rooms[room])
            }
        }
    })
})

server.listen(1234, () => {
    console.log("[*] Server is up and running ...")
})
