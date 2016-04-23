import {createStore, compose, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux'
import Immutable from 'immutable';

import {combineReducers} from 'redux-immutable';
import routerReducer from '../reducers/RouterReducer';

let logger = createLogger({
    actionTransformer: state => JSON.stringify(state, null, 4),
    stateTransformer:  state => JSON.stringify(state.toJS(), null, 4)
});

const defaultInitialState = new Immutable.Map();

export default function configStore(history, initialState = defaultInitialState){
    const reducer = combineReducers({
        routing: routerReducer,
    });

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(routerMiddleware(history)),
            applyMiddleware(logger)
        )
    )

    return store;
}
