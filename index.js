import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import App from './app/App';


// TODO: add redux and router
const store = createStore(()=>{});
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app-root')
);