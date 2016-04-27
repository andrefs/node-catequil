import Immutable from 'immutable';
import {
    USERS_FETCH_REQUEST,
    USERS_FETCH_SUCCESS,
    USERS_FETCH_FAILURE
} from '../constants';

const initialState = Immutable.fromJS({list:[]});

export default function users(state = initialState, action) {
    switch (action.type) {
    case USERS_FETCH_SUCCESS:
        return state.merge({'list': action.payload.list});
    default:
        return state;
    }
}
