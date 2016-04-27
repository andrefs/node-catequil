import React, { Component, PropTypes } from 'react';
import Col         from 'react-bootstrap/lib/Col';
import {Link} from 'react-router';
import FormGroup    from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl  from 'react-bootstrap/lib/FormControl';
import Navbar  from 'react-bootstrap/lib/Navbar';
import Button  from 'react-bootstrap/lib/Button';
import Immutable from 'immutable';

class Chat extends Component {
    static propTypes = {
        channels: PropTypes.instanceOf(Immutable.Map).isRequired,
        users: PropTypes.instanceOf(Immutable.List).isRequired,
        changeChannel: PropTypes.func.isRequired,
    };

    render(){
        const {socket, channels, users, dispatch, changeChannel} = this.props;
        return (
            <div>
                {/* Chat sidebar */}
                <Col md={3} style={{height: '100vh', display:'table'}} >
                    {/* Channel list */}
                    <div>
                        <h2>Channels</h2>
                        <ul>
                            {channels.get('list').map(channel =>
                                <li key={channel.get('name')} onClick={() => changeChannel(channel)} >
                                    {channel.get('name')}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        {/* Users list */}
                        <h2>Users</h2>
                        <ul>
                            {users.map(user =>
                                <li key={user.get('_id')} >{user.getIn(['local','username'])}</li>
                            )}
                        </ul>
                    </div>
                </Col>
                {/* Chat main area */}
                <Col md={9} style={{height: '100vh', display:'table'}} >

                    {/* Nav bar */}
                    <nav style={{position: 'relative', top:0}} className="navbar navbar-default navbar-fixed-top navbar-inverse">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">{channels.getIn(['activeChannel','name'])}</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                    </nav>

                    {/* Messages */}
                    <div style={{display: 'table-row', height:'100%'}}>
                        <h1>Messages</h1>
                    </div>

                    {/* Text area */}
                    <div style={{height: '100px', display: 'table-row'}}>
                        <FormGroup style={{position:'fixed', bottom:0, width:'inherit', display: 'block'}} controlId="formControlsTextarea" bsSize="large">
                            <FormControl componentClass="textarea" rows="2" placeholder="Enter your message..." />
                        </FormGroup>
                    </div>
                </Col>
            </div>
        )
    }
}

export default Chat;
