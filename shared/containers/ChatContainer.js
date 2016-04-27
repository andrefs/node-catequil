import React, { Component, PropTypes } from 'react';
import Col         from 'react-bootstrap/lib/Col';
import Chat        from '../components/Chat';
import {fetchChannels,changeChannel} from '../actions/channels';
import {fetchUsers} from '../actions/users';
import {connect} from 'react-redux';

//import io from 'socket.io-client';
//const socket = io('', { path: '/api/chat' });
const socket = '';

class ChatContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(fetchChannels());
        dispatch(fetchUsers());
    }

    changeActiveChannel(channel) {
        const {activeChannel, dispatch} = this.props;

        //socket.emit('leave channel', activeChannel);
        //socket.emit('join channel', channel);
        dispatch(changeChannel(channel.toJS()));
        //dispatch(fetchMessages(channel.name));
    }

    render(){
        return (
            <Chat changeChannel={::this.changeActiveChannel} {...this.props} socket={socket} />
        );
    }
}

function mapStateToProps(state) {
    return {
        channels: state.get('channels'),
        users: state.getIn(['users','list']),
    }
}

export default connect(mapStateToProps)(ChatContainer)
