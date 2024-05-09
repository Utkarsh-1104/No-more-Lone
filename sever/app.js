const express = require('express');
const {Server} = require('socket.io');
const { createServer } = require('http');

const app = express()
const cors = require('cors')   
const server = createServer(app) 
const io = new Server(server, {
    cors: true
})
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

io.on('connection', (socket) => {
    console.log("Connection made with socket id: ", socket.id);
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})