const { emit } = require('process');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 3000

const players = []
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generateQuestion () {
  let index = Math.round(Math.random()*25);
  let question = alphabet[index];
  let margin = Math.round(Math.random()*25);
  let answer;
  if((index+margin) > 25){
    answer = alphabet[index+margin-26];
  } else {
    answer = alphabet[index+margin];
  }
  return {
    question,
    margin,
    answer
  }
}

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
      if(e.score === 10) io.emit('end', {winner: e.name}) // kirim pemenang kalau score sudah 10
    })
    io.emit('getPlayers', players) //ngirim const players ke server
  })
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});