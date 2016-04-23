import Immutable from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';

const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});

export default (state = initialState, {type, payload} = {}) => {
    if (type === LOCATION_CHANGE) {
        const newState = state.merge({
            locationBeforeTransitions: Immutable.fromJS(payload)
        });
        return newState;
    }

    return state;
};

