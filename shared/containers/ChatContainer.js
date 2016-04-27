import React, { Component, PropTypes } from 'react';
import Col         from 'react-bootstrap/lib/Col';
import Chat        from '../components/Chat';
import {fetchChannels} from '../actions/channels';
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

    render(){
        return (
            <Chat {...this.props} socket={socket} />
        );
    }
}

function mapStateToProps(state) {
    return {
        channels: state.getIn(['channels','list']),
        users: state.getIn(['users','list']),
    }
}

export default connect(mapStateToProps)(ChatContainer)
