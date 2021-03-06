import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    MESSAGES_FETCH_REQUEST,
    MESSAGES_FETCH_SUCCESS,
    MESSAGES_FETCH_FAILURE,
    ADD_MESSAGE,
    SOCKET_SEND_MESSAGE
} from '../constants';


const fetchMessages = function(channelID, token) {
    return (dispatch) => {
        dispatch(messagesRequest());

        return fetch(`/api/messages/${channelID}`, token)
        .then(response => response.json())
        .then(messages => {
            var obj = {};
            obj[channelID] = messages.reverse();
            dispatch(messagesSuccess(obj));
        })
        .catch(error => {throw error});
    };
};

const sendMessage = function(message, socket){
    return (dispatch) => {
        dispatch(socketSendMessage(message));
        dispatch(addMessage(message));
    };
};

const receiveMessage = function(message){
    return (dispatch) => {
        dispatch(addMessage(message));
    };
};

const socketSendMessage = createAction(SOCKET_SEND_MESSAGE);
const addMessage        = createAction(ADD_MESSAGE);
const messagesSuccess   = createAction(MESSAGES_FETCH_SUCCESS);
const messagesRequest   = createAction(MESSAGES_FETCH_REQUEST);

export {fetchMessages, sendMessage, addMessage};
