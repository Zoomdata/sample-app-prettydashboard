
import 'babel-polyfill';
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import { createStore, applyMiddleware, compose } from 'redux';
import sagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers';
import { runSaga } from 'redux-saga';
import { Provider } from 'react-redux';
import rootSaga from './sagas';
import {responsiveStoreEnhancer} from 'redux-responsive';

import routes from './routes'

const createStoreWithMiddleware = compose( responsiveStoreEnhancer,
    applyMiddleware(sagaMiddleware(rootSaga)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    return store;
}

const store = configureStore();

const root = document.getElementById('app');

render(
	<Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,
  	root
)

