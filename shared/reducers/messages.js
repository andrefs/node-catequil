import Immutable from 'immutable';
import {
    MESSAGES_FETCH_REQUEST,
    MESSAGES_FETCH_SUCCESS,
    MESSAGES_FETCH_FAILURE,
    ADD_MESSAGE,
} from '../constants';

const initialState = new Immutable.Map();

export default function messages(state = initialState, action) {
    switch (action.type) {
    case MESSAGES_FETCH_SUCCESS:
        return state.merge(action.payload);
    case ADD_MESSAGE:
        const {channel} = action.payload;
        const messages = state.get(channel).push(Immutable.fromJS(action.payload));


        return state.set(channel, messages);
    default:
      return state;
    }
}


