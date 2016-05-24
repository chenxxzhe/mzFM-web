import {createStore, applyMiddleware} from 'redux';

import rootReducer from '../reducers';


const thunk = store => next => action => {
	console.log('enter thunk');
	return typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
};
const logger = store => next => action => {
	console.group(action.type);
	console.info('dispatch', action);
	let result = next(action);
	console.log('next state', store.getState());
	console.groupEnd(action.type);
	return result;
};

const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);


export default function configureStore(init){
	return createStoreWithMiddleware(rootReducer, init);
}