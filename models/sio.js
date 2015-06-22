var socketio = require('socket.io');
var dateformat = require('dateformat');
var debug = require('debug')('chatSample2:server');

module.exports = sio;

function sio(server) {

  // Socket.IO
  var sio = socketio.listen(server);
  sio.set('transports', [ 'websocket' ]);

  // 接続
  sio.on('connection', function(socket) {
    debug("connection");
    
    // 部屋入室
    socket.on('login', function(data) {
      debug("login");
      debug(data);
      socket.join(data.room);
    });
    
      // 通知受信
    socket.on('notice', function(data) {
      debug("receive notice");
      debug(data);
      // すべてのクライアントへ通知を送信
      // ブロードキャスト
      sio.sockets.to(data.room).emit('recieve', {
        type : data.type,
        user : data.user,
        value : data.value,
        time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      });
    });

    // 切断
    socket.on("disconnect", function() {
      debug("disconnect");
    });
       
  });
}