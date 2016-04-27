import 'isomorphic-fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    CHANNELS_FETCH_REQUEST,
    CHANNELS_FETCH_SUCCESS,
    CHANNELS_FETCH_FAILURE,
    CHANGE_CHANNEL,
} from '../constants';


const fetchChannels = function(data) {
    return (dispatch) => {
        dispatch(channelsRequest());

        return fetch('/api/channels')
        .then(response => response.json())
        .then(channels => {
            dispatch(channelsSuccess({list:channels}));
        })
        .catch(error => {throw error});
    };
};

const changeChannel = createAction(CHANGE_CHANNEL);
export {changeChannel, fetchChannels};

const channelsSuccess = createAction(CHANNELS_FETCH_SUCCESS);
const channelsRequest = createAction(CHANNELS_FETCH_REQUEST);
