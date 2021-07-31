// パッケージ群を読み込む
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// ポート番号を指定する
var port = process.env.PORT || 3000;
// IPを指定する
var ip = '127.0.0.1';
const fs = require('fs');

// クライアント側のリクエストに対して、画面(htmlファイル)を返す
app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

// httpサーバーを立てる
http.listen(port, ip);
console.log('listening on *:' + port);


var messages = [];

io.on('connection', function(socket){

  // サーバー側のメッセージリストをクライアント側に送る（emit）
  socket.emit('init-chat', messages);
  // クライアント側から送られたメッセージを受け取り、全クライアントに送る（emit）
  socket.on('c2s-msg', function(msg) {
      var newMessage = msg;
      messages.push(newMessage);
      io.emit('s2c-msg', newMessage);
  });

});