import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App      from './containers/App';
import Login    from './containers/Login';
import Register from './containers/Register';
import Chat     from './containers/Chat';
import Start    from './containers/Start';

export default (
    <Route path='/' component={App}>
        <Route component={Start} >
            <IndexRoute component={Login} />
            <Route path='/register' component={Register} />
        </Route>
        <Route path='/chat' component={Chat} />
    </Route>
)
