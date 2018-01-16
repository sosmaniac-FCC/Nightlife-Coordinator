import React from 'react';
import ReactDOM, { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import entries from './redux/entriesReducer';
import inputs from './redux/inputsReducer';
import Layout from './components/Layout';
import { loadState, saveState } from './localStorage';

// creating a combined store in-file
const reducers = combineReducers({
    entries,
    inputs
});
const persistedState = loadState();

const store = createStore(reducers, persistedState, applyMiddleware(thunk, logger));

store.subscribe(() => {
    saveState({
        inputs: {
            ...store.getState().inputs,
            fetching: true
        }
    });
});

render (
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);