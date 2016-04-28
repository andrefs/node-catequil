import Immutable from 'immutable';
import {
    MESSAGES_FETCH_REQUEST,
    MESSAGES_FETCH_SUCCESS,
    MESSAGES_FETCH_FAILURE,
} from '../constants';

const initialState = new Immutable.Map();

export default function messages(state = initialState, action) {
    switch (action.type) {
    case MESSAGES_FETCH_SUCCESS:
        return state.merge(action.payload);
    default:
      return state;
    }
}


