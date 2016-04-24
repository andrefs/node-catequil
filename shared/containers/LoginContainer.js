import React, { Component, PropTypes } from 'react';
import Login from '../components/Login';
import {getAuthError} from '../reducers/authReducer';
import {login} from '../actions/auth';
import {connect} from 'react-redux';


@connect(
    (state) => ({ error: getAuthError(state) }),
    { login }
)

class LoginContainer extends Component {
    static propTypes = {
        error: PropTypes.string,
        login: PropTypes.func.isRequired
    };

    render(){
        return (
            <Login {...this.props} />
        )
    }
}

export default LoginContainer;
