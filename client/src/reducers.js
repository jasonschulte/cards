import { createReducer } from 'redux-starter-kit';
import actions from './actions'

const reducer = createReducer([],{
  [actions.removeCard]: (state, action) => {
    state.cards.pop()
  },
  [actions.selectCard]: (state, action) => {
    state.selectedCard = action.payload.target.value
  },
  [actions.socketReceive]: (state, action) => {
    state = Object.assign(state,JSON.parse(action.payload.data))
  },
  [actions.shuffle]: (state, action) => {
    state.deck.shuffle++
  },
});

export default reducer;
