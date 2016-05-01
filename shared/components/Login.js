import React, { Component, PropTypes } from 'react';
import FormGroup     from 'react-bootstrap/lib/FormGroup';
import ControlLabel  from 'react-bootstrap/lib/ControlLabel';
import FormControl   from 'react-bootstrap/lib/FormControl';
import HelpBlock     from 'react-bootstrap/lib/HelpBlock';
import Panel         from 'react-bootstrap/lib/Panel';
import InputGroup    from 'react-bootstrap/lib/InputGroup';
import Glyphicon     from 'react-bootstrap/lib/Glyphicon';
import Button        from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Col           from 'react-bootstrap/lib/Col';
import {Link}        from 'react-router';

const panelHeader = (
    <div>
        <span>Enter your email address and password.</span>
        {/*<span className="text-right"><Link to={"/recover"}>Forgot your password?</Link></span>*/}
    </div>
);

class Login extends React.Component {

    static propTypes = {
        error: PropTypes.string,
        login: PropTypes.func.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.refs.email.value,
            password: this.refs.password.value,
        };
        this.props.login(data);
    }

    render(){
        return (
            <div>
                <div style={{height: '60px'}} />
                <div className="vertical-center">
                    <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                        <p className="login-intro h2 text-center">Login to Catequil chat</p>

                        <Panel header={panelHeader} bsStyle="info" >
                            <form onSubmit={this.onSubmit} >
                                <FormGroup controlId="formControlsEmail" bsSize="large">

                                    {/* Not using <FormControl> from react-bootstrap until I figure out how to getValue from it */}
                                    <span className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input type="email" placeholder="you@domain.com" className="form-control" ref="email" />
                                    </span>

                                </FormGroup>
                                <FormGroup controlId="formControlsPassword" bsSize="large">

                                    {/* Not using <FormControl> from react-bootstrap until I figure out how to getValue from it */}
                                    <span className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-lock"></span>
                                        </span>
                                        <input type="password" placeholder="password" id="formControlsPassword" className="form-control" ref="password"/>
                                    </span>

                                </FormGroup>

                                <FormGroup>
                                    <InputGroup>
                                        <ButtonToolbar>
                                            <Button bsStyle="success" bsSize="large" type="submit">Login</Button>
                                            {/*<Button bsStyle="primary" bsSize="large" href="/auth/facebook" >Login with Facebook</Button>*/}
                                        </ButtonToolbar>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup>
                                    <Col md={12}>
                                        Don't have an account? <Link to={"/register"} style={{fontWeight:'bold'}} >Register here!</Link>
                                    </Col>
                                </FormGroup>
                            </form>
                        </Panel>
                    </Col>
                </div>
            </div>
        );
    }
}

export default Login;
