import io from 'socket.io-client';
import Immutable from 'immutable';
import {
    AUTH_LOAD_FINISHED,
    ADD_MESSAGE
} from '../constants';

let socket = null;
let token  = null;

function _initSocket(token){
    socket = io('', {path:'/sockets/chat'});
    socket.on('connect', () => {
        socket.on('authenticated', () => {

            socket.on('new channel message', msg =>
                dispatch(receiveMessage(msg))
            );

        })
        .emit('authenticate', {token});
    });
}

export function socketsMiddleware(store) {
    return next => action => {
        const result = next(action);

        if(!socket && action.type === AUTH_LOAD_FINISHED){
            if(action.payload && action.payload.token){
                _initSocket(action.payload.token);
                return result;
            }
        }

        if(socket){
            switch(action.type){
            case ADD_MESSAGE:
                socket.emit('new message', action.payload);
            default:
                return result;
            }
        }

        return result;
    };
};
