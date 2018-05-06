const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
var socketIO = require('socket.io');

var app = express();
app.use(express.static(publicPath));
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })



var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected.')
    socket.on('disconnect', () => {
        console.log('Disconnected user.')
    })
})
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Magic happen at ${port} port`)
});