import React                   from 'react';
import ReactDOM                from 'react-dom';
import {Router,browserHistory} from 'react-router';
import routes                  from '../shared/routes';
import configStore             from '../shared/store/configStore';
import {syncHistoryWithStore}  from 'react-router-redux'
import {Provider}              from 'react-redux';
import Immutable               from 'immutable';
import {loadAuth}              from '../shared/actions/auth';

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);


const store = configStore(browserHistory,initialState);
const redirectPath = store.getState().getIn(['routing', 'locationBeforeTransitions','query','redirect']);
store.dispatch(loadAuth(redirectPath));              // try to load token from localStorage

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing').toJS()
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes(store)}/>
    </Provider>,
    document.getElementById('app')
);
