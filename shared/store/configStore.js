import {createStore, compose, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux'
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import {socketsMiddleware} from '../middlewares/sockets';

import {combineReducers} from 'redux-immutable';
import routerReducer     from '../reducers/RouterReducer';
import usersReducer      from '../reducers/usersReducer';
import authReducer       from '../reducers/authReducer';
import channels          from '../reducers/channels';
import messages          from '../reducers/messages';


const defaultInitialState = new Immutable.Map();

export default function configStore(history, initialState = defaultInitialState){
    const reducer = combineReducers({
        routing : routerReducer,
        auth    : authReducer,
        channels,
        users: usersReducer,
        messages
    });

    let middlewares = [
        thunk,
        routerMiddleware(history),
        socketsMiddleware,
    ];

    if(process.env.NODE_ENV === 'development'){
        let logger = createLogger({
            //actionTransformer: state => JSON.stringify(state, null, 4),
            stateTransformer:  state => JSON.stringify(state.toJS(), null, 4)
        });
        middlewares.push(logger);
    }

    const store = createStore(
        reducer,
        initialState,
        compose(applyMiddleware(...middlewares))
    )

    return store;
}
