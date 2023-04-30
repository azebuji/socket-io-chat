import express from 'express';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

app.get('/teste', (req, res) => {
    res.send('Ok');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});


server.listen(3000, () => {
    console.log('Ouvindo na porta 3000');
})
