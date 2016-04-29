import React, { Component, PropTypes } from 'react';
import Col         from 'react-bootstrap/lib/Col';
import Chat        from '../components/Chat';
import {fetchChannels,changeChannel} from '../actions/channels';
import {fetchUsers} from '../actions/users';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';
import {sendMessage,receiveMessage} from '../actions/messages';
import {bindActionCreators} from 'redux'

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class ChatContainer extends Component {

    componentWillMount() {
        const {dispatch,token} = this.props;

        dispatch(fetchChannels(token));
        dispatch(fetchUsers(token));
    }

    changeActiveChannel(newChannel) {
        const {dispatch, token, activeChannel} = this.props;
        dispatch(changeChannel(newChannel.toJS(),token));
    }

    render(){
        return (
            <Chat changeChannel={::this.changeActiveChannel} {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        channels: state.get('channels'),
        users: state.getIn(['users','list']),
        messages: state.get('messages'),
        activeChannel: state.getIn(['channels','activeChannel']),
        token: state.getIn(['auth','token']),
        user: state.getIn(['auth','user']),
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        logout: bindActionCreators(logout, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch)
    }
}

export default ChatContainer;
