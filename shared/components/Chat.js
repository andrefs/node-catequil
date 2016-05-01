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
        channels         : PropTypes.instanceOf(Immutable.Map).isRequired,
        users            : PropTypes.instanceOf(Immutable.List).isRequired,
        messages         : PropTypes.instanceOf(Immutable.Map).isRequired,
        changeChannel    : PropTypes.func.isRequired,
        newDirectMessage : PropTypes.func.isRequired,
        logout           : PropTypes.func.isRequired,
        token            : PropTypes.string.isRequired,
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
        const {channels, users, messages, dispatch, activeChannel, changeChannel, token, newDirectMessage} = this.props;
        const numParticipants = activeChannel.get('participants') ? activeChannel.get('participants').size : 0;

        return (
            <div style={{padding:0, width:'100vw', height:'100vh'}}>
                {/* Chat sidebar */}
                <Col className="sidebar" md={2} style={{height:'100%', display:'table-cell'}} >
                    {/* Channel list */}
                    <div className="section">
                        <p className="h3 sidebar-header">
                            <span>Channels</span>
                            <a href="#"><span onClick={this.createChannel} style={{float:'right'}} className="glyphicon glyphicon-plus"></span></a>
                        </p>
                        <ul className="sidebar-list">
                            {channels.get('list').map(channel =>
                                <li className={channel.get('_id') === activeChannel.get('_id') ? "channel active":"channel"} key={channel.get('name')} onClick={() => changeChannel(channel, token)} >
                                    <a href="#">{channel.get('name')}</a>
                                </li>
                            )}

                        </ul>
                    </div>
                    <div className="section">
                        {/* Users list */}
                        <p className="h3 sidebar-header">
                            <span>Users</span>
                        </p>
                        <ul className="sidebar-list">
                            {users.map(user =>
                                <li key={user.get('_id')} onClick={() => newDirectMessage(user.get('_id'))} >
                                    <a href="#">{user.get('username')}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </Col>
                {/* Chat main area */}
                <Col md={10} style={{height:'100%',padding:0, display:'table-cell',padding:0}} >
                    <Col md={10} style={{padding:0, position:'fixed', top:0}}>

                        {/* Nav bar */}
                        <nav style={{position: 'relative'}} className="navbar navbar-fixed-top">
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#">
                                        <div className="logo"></div>{activeChannel.get('name')}
                                    </a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Navbar.Text pullLeft>{numParticipants} members</Navbar.Text>
                                <Navbar.Form pullRight style={{marginRight: '-10px'}} >
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
