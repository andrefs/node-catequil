import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

class MessageItem extends React.Component {
    static propTypes = {
        message: PropTypes.instanceOf(Immutable.Map).isRequired,
    };

    render() {
        const {message} = this.props;
        const sentAt  = new Date(message.get('sentAt'));
        const hour    = sentAt.getHours();
        const minutes = sentAt.getMinutes();
        const time    = (hour < 10 ? '0' : '')+hour+(minutes < 10 ? ':0' : ':')+minutes;
        const author  = message.get('author');
        const username  = author.get('username') || author.getIn(['local','username']) || author.getIn(['facebook','username']);
        const photoURL = author.get('photo') || author.getIn(['facebook','photo']) || '/img/user.png'; // TODO: get from config

        return (
            <div style={{marginBottom: '20px', position:'relative'}}>
                <div style={{width:'51px', position:'absolute', textAlign:'right', paddingRight:'5px'}}>
                    <img style={{width: '36px',height:'36px'}} src={photoURL} />
                </div>
                <div style={{marginLeft: '51px'}}>
                    {/* Author */}
                    <span style={{'fontWeight':'bold', marginRight: '5px'}} >{username}</span>

                    {/* Time */}
                    <span className="small" style={{'fontStyle':'italic', color: '#969696'}} >{time}</span>

                    {/* Text */}
                    <span style={{display:'block'}}>{message.get('text')}</span>
                </div>
            </div>
        );
    }
}

export default MessageItem;
