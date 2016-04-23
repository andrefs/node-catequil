import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App      from './containers/App';
import Chat     from './containers/Chat';
import Start    from './containers/Start';
import LoginContainer    from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';

export default (
    <Route path='/' component={App}>
        <Route component={Start} >
            <IndexRoute component={LoginContainer} />
            <Route path='/register' component={RegisterContainer} />
        </Route>
        <Route path='/chat' component={Chat} />
    </Route>
)
