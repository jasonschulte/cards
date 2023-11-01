import { createAction } from 'redux-starter-kit';

const actions = {
  getCard: createAction('get/card'),
  shuffle: createAction('shuffle'),
  putShuffle: createAction('put/shuffle'),
  playCard: createAction('put/card'),
  removeCard: createAction('remove/card'),
  selectCard: createAction('select/card'),
  socketClose: createAction('SOCKET_CLOSE'),
  socketConnect: createAction('SOCKET_CONNECT'),
  socketError: createAction('SOCKET_ERROR'),
  socketReceive: createAction('SOCKET_RECEIVE'),
}

export default actions;
