import React, { Component, PropTypes } from 'react';
import Col         from 'react-bootstrap/lib/Col';
import {Link} from 'react-router';
import FormGroup    from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl  from 'react-bootstrap/lib/FormControl';
import Immutable from 'immutable';

class Chat extends Component {
    static propTypes = {
        channels: PropTypes.instanceOf(Immutable.List).isRequired,
        users: PropTypes.instanceOf(Immutable.List).isRequired,
    };

    render(){
        const {socket, channels, users, dispatch} = this.props;
        return (
            <div>
                {/* Chat sidebar */}
                <Col md={3} style={{height: '100vh', display:'table'}} >
                    {/* Channel list */}
                    <div>
                        <h1>ChannelList</h1>
                        <ul>
                            {channels.map(channel =>
                                <li key={channel.get('name')} >{channel.get('name')}</li>
                            )}
                        </ul>
                    </div>
                    <div>
                        {/* Users list */}
                        <h1>UserList</h1>
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
                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to={"#"}>Catequil</Link>
                        </div>
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
