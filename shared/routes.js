import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App      from './containers/App';
import ChatContainer     from './containers/ChatContainer';
import Start    from './containers/Start';
import LoginContainer    from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import {UserAuthWrapper} from 'redux-auth-wrapper'
import {routerActions} from 'react-router-redux';
import {push} from 'react-router-redux';




// Redirects to /login by default
const Auth = UserAuthWrapper({
    authSelector :
        state => state.getIn(['auth']), // how to get the user state
    predicate: authData => !!authData.get('token'), // decide whether to fail or succeed
    failureRedirectPath : '/',
    wrapperDisplayName  : 'Auth'    // a nice name for this auth check
})

export default function routes(store) {

    const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

    return (
        <Route path='/' component={App}>
            <Route component={Start} >
                <IndexRoute component={LoginContainer} />
                <Route path='/register' component={RegisterContainer} />
            </Route>
            <Route path='/chat' component={Auth(ChatContainer)} onEnter={connect(Auth.onEnter)} />
        </Route>
    );
};

