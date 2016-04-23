import React                   from 'react';
import ReactDOM                from 'react-dom';
import {Router,browserHistory} from 'react-router';
import routes                  from '../shared/routes';
import configStore             from '../shared/store/configStore';
import {syncHistoryWithStore}  from 'react-router-redux'
import {Provider}              from 'react-redux';
import Immutable               from 'immutable';

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);

const rootElement = document.getElementById('app');
const store = configStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing').toJS()
});


ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);
