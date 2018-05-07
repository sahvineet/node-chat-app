const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
var socketIO = require('socket.io');
const { isRealString } = require('./utils/validation')
const { generateMessage, generateLocationMessage } = require('./utils/message')

var app = express();
app.use(express.static(publicPath));
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected.')

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room name cannot be blank');
        }

        socket.join(params.room);
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to AZ chat'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has Joined!`))
    

        callback(null);
    })
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server.')
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('Disconnected user.')
    })
})

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Magic happen at ${port} port`)
});