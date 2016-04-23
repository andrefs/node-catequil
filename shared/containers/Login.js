import React from 'react';
import Col from 'react-bootstrap/lib/Col';

class Login extends React.Component {
    render(){
        return (
            <Col md={6} mdOffset={3} sm={8} smOffset={2}>
                <p className="login-intro h2 text-center">Login to Catequil chat</p>
            </Col>
        );
    }
}

export default Login;
