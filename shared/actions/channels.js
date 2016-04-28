import 'isomorphic-fetch';
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

const fetchChannels = function() {
    return (dispatch) => {
        dispatch(channelsRequest());

        return fetch('/api/channels')
        .then(response => response.json())
        .then(channels => {
            let firstChannel = channels[0];
            dispatch(channelsSuccess({list:channels}));
            dispatch(changeChannel(firstChannel));
        })
        .catch(error => {throw error});
    };
};

const changeChannel = function(channel){
    return (dispatch) => {
        dispatch(setActiveChannel(channel));
        dispatch(fetchMessages(channel['_id']));
    };
};

export {changeChannel, fetchChannels};

const channelsSuccess = createAction(CHANNELS_FETCH_SUCCESS);
const channelsRequest = createAction(CHANNELS_FETCH_REQUEST);
