import io from 'socket.io-client';
import {addMessage} from '../actions/messages';
import {
    AUTH_LOAD_FINISHED,
    SOCKET_SEND_MESSAGE,
    UNSET_ACTIVE_CHANNEL,
    SET_ACTIVE_CHANNEL,

} from '../constants';


let socket = null;
let token  = null;

function _initSocket(token, store){
    socket = io('', {path:'/sockets/chat'});
    socket.on('connect', () => {
        socket.on('authenticated', () => {

            socket.on('new channel message', msg => {
                store.dispatch(addMessage(msg))
            });

        })
        .emit('authenticate', {token});
    });
}

export function socketsMiddleware(store) {
    return next => action => {
        const result = next(action);

        if(!socket && action.type === AUTH_LOAD_FINISHED){
            if(action.payload && action.payload.token){
                _initSocket(action.payload.token, store);
                return result;
            }
        }

        if(socket){
            switch(action.type){
            case SOCKET_SEND_MESSAGE:
                socket.emit('new message', action.payload);
            case UNSET_ACTIVE_CHANNEL:
                const oldChannelID = store.getState().getIn(['channels','activeChannel','_id']);
                if(oldChannelID){ socket.emit('leave channel', oldChannelID); }
            case SET_ACTIVE_CHANNEL:
                const newChannelID = store.getState().getIn(['channels','activeChannel','_id']);
                socket.emit('join channel', newChannelID);

            default:
                return result;
            }
        }

        return result;
    };
};
