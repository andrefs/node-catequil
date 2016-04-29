import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';
import {fetchMessages} from './messages';

import {
    CHANNELS_FETCH_REQUEST,
    CHANNELS_FETCH_SUCCESS,
    CHANNELS_FETCH_FAILURE,
    SET_ACTIVE_CHANNEL,
} from '../constants';

const setActiveChannel = createAction(SET_ACTIVE_CHANNEL);

const fetchChannels = function(token) {
    return (dispatch) => {
        dispatch(channelsRequest());

        return fetch('/api/channels', token)
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
        dispatch(setActiveChannel(newChannel));
        dispatch(fetchMessages(newChannel._id, token));
    };
};

export {changeChannel, fetchChannels};

const channelsSuccess = createAction(CHANNELS_FETCH_SUCCESS);
const channelsRequest = createAction(CHANNELS_FETCH_REQUEST);
