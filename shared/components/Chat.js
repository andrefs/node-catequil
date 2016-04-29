import React, { Component, PropTypes } from 'react';
import Col         from 'react-bootstrap/lib/Col';
import {Link} from 'react-router';
import FormGroup    from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl  from 'react-bootstrap/lib/FormControl';
import Navbar  from 'react-bootstrap/lib/Navbar';
import Button  from 'react-bootstrap/lib/Button';
import Immutable from 'immutable';
import Messages from './Messages';

class Chat extends Component {
    static propTypes = {
        channels      : PropTypes.instanceOf(Immutable.Map).isRequired,
        users         : PropTypes.instanceOf(Immutable.List).isRequired,
        messages      : PropTypes.instanceOf(Immutable.Map).isRequired,
        changeChannel : PropTypes.func.isRequired,
        logout        : PropTypes.func.isRequired,
        token         : PropTypes.string.isRequired,
    };

    componentDidMount() {
        const {user, dispatch} = this.props;
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    handleSubmit = (e) => {
        if(e.which === 13){
            const {activeChannel,token,user} = this.props;
            e.preventDefault();
            const text = this.refs.message.value.trim();
            const activeChannelID = activeChannel.get('_id');

            const newMessage = {
                _id: Date.now(),
                text,
                channel: activeChannelID,
                author:user,
                sentAt: new Date().toISOString()
            };

            this.props.sendMessage(newMessage);

            this.refs.message.value = '';
        }
    }


    render(){
        const {channels, users, messages, dispatch, activeChannel, changeChannel, token} = this.props;
        const numParticipants = activeChannel.get('participants') ? activeChannel.get('participants').size : 0;

        return (
            <div style={{padding:0, width:'100vw', height:'100vh'}}>
                {/* Chat sidebar */}
                <Col md={2} style={{height:'100%',borderRight: '1px solid rgb(158, 158, 166)', display:'table-cell'}} >
                    {/* Channel list */}
                    <div>
                        <h2>Channels</h2>
                        <ul>
                            {channels.get('list').map(channel =>
                                <li key={channel.get('name')} onClick={() => changeChannel(channel, token)} >
                                    <a href="#">{channel.get('name')}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        {/* Users list */}
                        <h2>Users</h2>
                        <ul>
                            {users.map(user =>
                                <li key={user.get('_id')} >{user.get('username')}</li>
                            )}
                        </ul>
                    </div>
                </Col>
                {/* Chat main area */}
                <Col md={10} style={{height:'100%',padding:0, display:'table-cell',padding:0}} >
                    <Col md={10} style={{position:'fixed', top:0}}>

                        {/* Nav bar */}
                        <nav style={{position: 'relative'}} className="navbar navbar-default navbar-fixed-top navbar-inverse">
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#">{activeChannel.get('name')}</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Navbar.Text pullLeft>{numParticipants} members</Navbar.Text>
                                <Navbar.Form pullRight>
                                  <Button onClick={this.handleLogout}>Logout</Button>
                                </Navbar.Form>
                            </Navbar.Collapse>
                        </nav>
                    </Col>

                    {/* Messages */}
                    <Messages messages={messages} activeChannel={activeChannel} />

                    {/* Text area */}
                    <Col md={10} style={{height: '100px', bottom:0, position:'fixed', padding:0}}>

                        <form style={{height:'100%'}} >
                        <FormGroup style={{height:'100%',display: 'block'}} controlId="formControlsTextarea" bsSize="large">
                            <textarea placeholder="Enter your message..." id="formControlsTextarea" className="form-control" style={{height: '100%', borderRadius: 0}} autofocus={true} ref="message" onKeyDown={::this.handleSubmit} ></textarea>
                        </FormGroup>
                        </form>
                    </Col>
                </Col>
            </div>
        )
    }
}

export default Chat;
