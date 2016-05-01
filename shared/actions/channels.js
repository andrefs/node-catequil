import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';
import {fetchMessages} from './messages';

import {
    CHANNELS_FETCH_REQUEST,
    CHANNELS_FETCH_SUCCESS,
    CHANNELS_FETCH_FAILURE,
    SET_ACTIVE_CHANNEL,
    UNSET_ACTIVE_CHANNEL,
    ADD_CHANNEL,
} from '../constants';

const openPrivate = function(token, otherID){
    return dispatch => {
        return fetch(`/api/channels/private/${otherID}`, token)
        .then(response => response.json())
        .then(channel => {
            dispatch(changeChannel(channel, token));
        })
        .catch(error => {throw error});
    };
}

const fetchChannels = function(token) {
    return (dispatch) => {
        dispatch(channelsRequest());

        return fetch('/api/channels/rooms', token)
        .then(response => response.json())
        .then(channels => {
            let firstChannel = channels[0];
            dispatch(channelsSuccess({list:channels}));
            dispatch(changeChannel(firstChannel, token));
        })
        .catch(error => {throw error});
    };
};

const changeChannel = function(newChannel, token){
    return (dispatch) => {
        dispatch(unsetActiveChannel());
        dispatch(setActiveChannel(newChannel));
        dispatch(fetchMessages(newChannel._id, token));
    };
};

export {changeChannel, fetchChannels, openPrivate};

const addChannel         = createAction(ADD_CHANNEL);
const setActiveChannel   = createAction(SET_ACTIVE_CHANNEL);
const unsetActiveChannel = createAction(UNSET_ACTIVE_CHANNEL);
const channelsSuccess    = createAction(CHANNELS_FETCH_SUCCESS);
const channelsRequest    = createAction(CHANNELS_FETCH_REQUEST);
