const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 3000

let players = []

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connect')

  socket.on('getPlayers', payload => {
    io.emit('getPlayers', players)
  })

  socket.on('join', (payload) => {
    players.push(payload)
    io.emit('getPlayers', players)
    if(players.length == 2) { // mulai game kalau player sudah 2 orang
      sleep(5000) // kasi delay sebelum mulai game
      io.emit('start')
    }
  })

  socket.on('tambah', name => { // untuk nambah score
    players.map(e => {
      if(e.name === name) e.score++
      if(e.score === 10){
        io.emit('end', {winner: e.name}) // kirim pemenang kalau score sudah 10
        players = [];
      } 
    })
    io.emit('getPlayers', players) //ngirim const players ke server
  })
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});