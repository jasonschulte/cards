import { eventChannel } from 'redux-saga'
import { select, all, call, put, take, race } from 'redux-saga/effects'

function watchSocket(ws) {
  return eventChannel( emitter => {
    ws.onmessage = e => {
      if (e.type === "message"){ emitter(e); }
    }
    return () => {
      ws.close();
    };
  });
}

function* wsReceive(socketChannel) {
  while (true) {
    const payload = yield take(socketChannel);
    console.log(payload)
    if (payload.type === "message") {
      yield put({
        type: "SOCKET_RECEIVE",
        payload: payload
      });
    }
  }
}

function* wsSend(socket) {
  while (true) {
    const data = yield take(function(action){
      return ['get','put'].includes(action.type.substring(0,3))
    });
    const state = yield select();
    if(socket.readyState === WebSocket.CLOSED){
      yield all([
        put({type: 'SOCKET_CLOSE'}),
        put({type: 'SOCKET_CONNECT'}),
        put({type: data.type })
      ])
    }
    if(socket.readyState === WebSocket.OPEN){
      socket.send(JSON.stringify({ type: data.type, state: state }));
    }
    if(socket.readyState === WebSocket.CONNECTING){
      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({ type: data.type, state: state }));
      });
    }
  }
}

const wsSaga = function* () {
  while (true){
    yield take('SOCKET_CONNECT');
    const socket = new window.WebSocket('ws://localhost:8080')
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ firstMessageToServer: 1 }));
    });
    const socketChannel = yield call(watchSocket, socket)
    const { cancel } = yield race({
      task: all([
        call(wsReceive, socketChannel),
        call(wsSend, socket)
      ]),
      cancel: take('SOCKET_CLOSE')
    })
    if(cancel){
      socketChannel.close();
    }
  }
}

export default wsSaga;
