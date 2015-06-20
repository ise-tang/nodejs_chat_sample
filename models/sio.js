var socketio = require('socket.io');
var dateformat = require('dateformat');
var debug = require('debug')('chatSample2:server');

module.exports = sio;

function sio(server) {

  // Socket.IO
  var sio = socketio.listen(server);
  sio.set('transports', [ 'websocket' ]);

  // 接続
  sio.sockets.on('connection', function(socket) {
    debug("connection");
    // 通知受信
    socket.on('notice', function(data) {
      debug("receive notice");
      debug(data);
      // すべてのクライアントへ通知を送信
      // ブロードキャスト
      sio.emit('recieve', {
        type : data.type,
        user : data.user,
        value : data.value,
        time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      });
    });

    // 切断
    socket.on("disconnect", function() {
      debug("disconnetc");
    });
  });
}