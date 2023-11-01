import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import wsSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
  devTools: true,
  preloadedState: {
    deck: {
      numCards: 52,
      shuffle: 0,
    }
  }
});
sagaMiddleware.run(wsSaga);

export { store }
