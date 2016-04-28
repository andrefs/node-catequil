import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    MESSAGES_FETCH_REQUEST,
    MESSAGES_FETCH_SUCCESS,
    MESSAGES_FETCH_FAILURE
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

export {fetchMessages};

const messagesSuccess = createAction(MESSAGES_FETCH_SUCCESS);
const messagesRequest = createAction(MESSAGES_FETCH_REQUEST);
