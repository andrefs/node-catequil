import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import Col         from 'react-bootstrap/lib/Col';
import MessageItem from './MessageItem';

class Messages extends React.Component {
    static propTypes = {
        messages : PropTypes.instanceOf(Immutable.Map).isRequired,
    };

    render() {
        const {messages,activeChannel} = this.props;
        const channelMessages = messages.get(activeChannel.get('_id')) || new Immutable.List();

        return (
            <Col md={10} style={{position:'fixed',  top:'51px', bottom:'100px', right:0, overflowX:'hidden'}}>
            {channelMessages.map(message =>
                <MessageItem message={message} key={message.get('_id')} />
            )}
            </Col>
        );
    }
}

export default Messages;
