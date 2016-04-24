import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App      from './containers/App';
import Chat     from './containers/Chat';
import Start    from './containers/Start';
import LoginContainer    from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import { isLoggedIn } from './reducers/Auth';

export default function routes(store) {
    const requireLogin = (nextState, replace) => {
        if (store && !isLoggedIn(store.getState())) {
            replace('/');
        }
    };

    return (
        <Route path='/' component={App}>
            <Route component={Start} >
                <IndexRoute component={LoginContainer} />
                <Route path='/register' component={RegisterContainer} />
            </Route>
            <Route path='/chat' onEnter={requireLogin} component={Chat} />
        </Route>
    );
};
