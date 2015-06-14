var socket = io.connect({ transports: [ 'websocket' ] });

socket.on('connect', function () {
	emit('login');
  console.log('connect');
});

socket.on('disconnect', function () {
	
	
});

socket.on('recieve', function(data) {
  console.log("recieve");
  var item = $('<li>').append($('<small>').append(data.time));

  // data.typeを解釈し、要素を生成する
  if (data.type === 'login') {
    item.addClass('alert alert-success').append($('<div>').append(data.user + 'がログインしました'));
  } else if (data.type === 'logout') {
    item.addClass('alert alert-danger').append($('<div>').append(data.user + 'がログアウトしました'));
  } else if (data.type === 'chat') {
    var msg = data.value.replace(/[!@$%<>'"&|]/g, '');
    item.addClass('well well-lg').append($('<div>').text(msg)).children('small').prepend(data.user + '：');
  } else {
    item.addClass('alert alert-danger').append($('<div>').append('不正なメッセージを受信しました'));
  }

  $('#chat-area').prepend(item).hide().fadeIn(800);
});

// イベント発信
function emit(type, msg) {
  console.log(msg);
  console.log($('#username').val());
  socket.emit('notice', {
    type : type,
    user : $('#username').val(),
    value : msg,
  });
  console.log("emit done");
}

// クライアントからメッセージ送信
function sendMessage() {
  console.log("sendMessage");
  // メッセージ取得
  var msg = $('#message').val();
  // 空白にする
  $('#message').val("");
  // メッセージ通知
  emit('chat', msg);
}

// イベントの登録
$(document).ready(function() {
  $(window).on('beforeunload', function(e) {
    // ログアウト通知
    emit('logout');
  });

  // 送信ボタンのコールバック設定
  $('#send').click(sendMessage);
});