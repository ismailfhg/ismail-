const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

// SƏNİN ÖZƏL GİRİŞ KODLARIN - Bunları sən paylayacaqsan
const MASTER_KEYS = ["ADMIN-2026", "PHOENIX-GOLD", "ZULM-STOP"];

io.on('connection', socket => {
    socket.on('authenticate', (key) => {
        if (MASTER_KEYS.includes(key)) {
            socket.emit('auth-success');
        } else {
            socket.emit('auth-failed');
        }
    });

    socket.on('chat-msg', (data) => {
        // Mesajı göndərən şəxs istisna olmaqla hər kəsə yay
        socket.broadcast.emit('new-msg', data);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Phoenix Node Active on Port ${PORT}`));
