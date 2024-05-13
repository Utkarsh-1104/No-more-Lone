const express = require('express');
const {Server} = require('socket.io');
const { createServer } = require('http');

const app = express()
const cors = require('cors')   
const server = createServer(app) 
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

io.on('connection', (socket) => {
    console.log("Connection made with socket id: ", socket.id);

    socket.emit('welcome', 'Welcome to the server')
    socket.broadcast.emit('welcome', `${socket.id} has joined the chat`)
    
    socket.on('disconnect', () => {
        console.log(`${socket.id} has left the chat`);
    })
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})