import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Panel from 'react-bootstrap/lib/Panel';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Col from 'react-bootstrap/lib/Col';
import {Link} from 'react-router';

const panelHeader = (
    <div>
        <span>Enter your email address and choose a password.</span>
        {/*<span className="text-right"><Link to={"/recover"}>Forgot your password?</Link></span>*/}
    </div>
);

class Register extends React.Component {

    render(){
        return (
            <div className="vertical-center">
            <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                <p className="login-intro h2 text-center">Register in Catequil chat</p>

                <Panel header={panelHeader} bsStyle="info" >
                    <form>
                        <FormGroup controlId="formControlsEmail" bsSize="large">
                            <InputGroup>
                                <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                                <FormControl type="email" placeholder="you@domain.com" ref="email" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup controlId="formControlsPassword" bsSize="large">
                            <InputGroup>
                                <InputGroup.Addon><Glyphicon glyph="lock" /></InputGroup.Addon>
                                <FormControl type="password" placeholder="password" ref="password" />
                            </InputGroup>
                        </FormGroup>


                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button bsStyle="success" bsSize="large" type="submit">Register</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>

                        {/*
                        <FormGroup>
                            <Col md={12}>
                                Don't have an account? <Link to={"/register"}>Register here!</Link>
                            </Col>
                        </FormGroup>
                        */}
                    </form>
                </Panel>
            </Col>
            </div>
        );
    }
}

export default Register;
