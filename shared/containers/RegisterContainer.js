import React, { Component, PropTypes } from 'react';
import Register from '../components/Register';
import {getAuthError} from '../reducers/authReducer';
import {register} from '../actions/auth';
import {connect} from 'react-redux';


@connect(
    (state) => ({ error: getAuthError(state) }),
    {register}
)

class RegisterContainer extends Component {
    static propTypes = {
        error: PropTypes.string,
        register: PropTypes.func.isRequired
    };

    render(){
        return (
            <Register {...this.props} />
        )
    }
}

export default RegisterContainer;
