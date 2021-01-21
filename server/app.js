const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(http);

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

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connect')
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});