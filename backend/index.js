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
    // user joins a room
    socket.on('joinRoom', ({username, room}) => {
        socket.join(room)
        rooms[room].push({id: socket.id, username})
        io.emit('newUser', {username})
        io.emit('userList', rooms[room])
        console.log(rooms[room])
    })

    // handle incoming messages
    socket.on('chatMessage', ({message, room, username}) => {
        console.log(message,room,username)
        const rooms = io.of("/").adapter.rooms
        if(rooms.has(room)) {
            console.log(rooms)
            io.to(room).emit('newMessage', {message, username})
            console.log('message sent to all clients')
        } else {
            console.error('Error: Room not found')
        }
    })

    // handle user disconnects
    socket.on('disconnect', () => {
        for(const room in rooms) {
            const index = rooms[room].indexOf((user) => user.id === socket.id)
            if(index !== -1) {
                rooms[room].splice(index, 1) // remove user from users list
                io.emit('userList', rooms[room])
            }
        }
    })
})

server.listen(1234, () => {
    console.log("[*] Server is up and running ...")
})
