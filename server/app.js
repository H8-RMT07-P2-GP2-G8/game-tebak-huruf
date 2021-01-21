const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connect')

  socket.on('join', (payload) => {
    players.push(payload)
    io.emit('getPlayers', players)
  })

  socket.on('tambah', i => {
    players[i].score++
    io.emit('getPlayers', players)
  })
});

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});