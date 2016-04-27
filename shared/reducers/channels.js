import Immutable from 'immutable';
import {
    CHANNELS_FETCH_REQUEST,
    CHANNELS_FETCH_SUCCESS,
    CHANNELS_FETCH_FAILURE,
    CHANGE_CHANNEL
} from '../constants';

const initialState = Immutable.fromJS({
    list:[],
    activeChannel: {}
});

export default function channels(state = initialState, action) {
    switch (action.type) {
    case CHANNELS_FETCH_SUCCESS:
        return state.merge({
            list: action.payload.list,
            activeChannel: action.payload.list[0]
        });
    case CHANGE_CHANNEL:
        return state.merge({
            activeChannel: action.payload
        });
    default:
      return state;
    }
}


