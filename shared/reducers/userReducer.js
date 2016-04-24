import Immutable from 'immutable';

import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../constants';

const userReducer = (state = {}, { type, payload }) => {
    if(type === USER_LOGGED_IN){
        return Immutable.fromJS(payload);
    }
    if(type === USER_LOGGED_OUT) {
        return new Immutable.Map();
    }
    return state
}

export default userReducer;
