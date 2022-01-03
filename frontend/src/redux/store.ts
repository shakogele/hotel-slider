import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import uiReducer from './reducers/ui';
import hotelsReducer from './reducers/hotels';

const rootReducer = combineReducers({
	ui: uiReducer,
	hotels: hotelsReducer
});

let composeEnhancers = compose;
const middlewares = [thunk];

const configureStore: () => any = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
};

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;