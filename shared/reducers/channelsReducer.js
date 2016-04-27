import Immutable from 'immutable';
import {
    CHANNELS_FETCH_REQUEST,
    CHANNELS_FETCH_SUCCESS,
    CHANNELS_FETCH_FAILURE
} from '../constants';

const initialState = Immutable.fromJS({list:[]});

export default function channels(state = initialState, action) {
    switch (action.type) {
    case CHANNELS_FETCH_SUCCESS:
        return state.merge({'list': action.payload.list});
    default:
      return state;
    }
}
