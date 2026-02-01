const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
        
        socket.on('chat-msg', (data) => {
            io.to(roomId).emit('new-msg', data);
        });

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`PHOENIX GLOBAL NODE ACTIVE ON ${PORT}`));
