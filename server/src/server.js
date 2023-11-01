const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  console.log('connection established');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    msg = JSON.parse(message)
    // console.log(wss.clients.size)
    state = msg.state
    if(!msg.firstMessageToServer){
      if(msg.type == 'put/shuffle'){
        state.deck.shuffle++;
      }
      resp = JSON.stringify(state)
      console.log('sent: %s', resp);
      sendMessage(resp)
    }
  });
  const sendMessage = (message) => {
    ws.send(message);
  }
});
