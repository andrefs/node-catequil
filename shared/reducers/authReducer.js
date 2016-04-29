import Immutable from 'immutable';
import {handleActions} from 'redux-actions';
import {
  AUTH_LOAD_FINISHED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT_SUCCESS
} from '../constants';

const initialState = Immutable.fromJS({
    token: null,
    user:  null
});

export default handleActions({
    [AUTH_LOAD_FINISHED] : (state, {payload}) => state.merge(payload),
    [AUTH_LOGIN_REQUEST] : (state)            => state.set('isLoggingIn', true),
    [AUTH_LOGIN_SUCCESS] : (state, {payload}) => {
        return state.merge({
            ...payload,
            isLoggingIn: false,
            error: null
        });
    },
    [AUTH_REGISTER_SUCCESS] : (state, {payload}) => {
        return state.merge({
            ...payload,
            isLoggingIn: false,
            error: null
        });
    },
    [AUTH_LOGIN_FAILURE]: (state, { payload: error }) => {
        return state.merge({
            isLoggingIn: false,
            token: null,
            error: error.message
        });
    },
    [AUTH_LOGOUT_SUCCESS]: (state) => state.merge({token: null, user:null})
}, initialState);

export const stateKey = 'auth';
export const getAuthState = state => state[stateKey];
export const getAuthError = state => state.get('error');
export const getAuthToken = state => state.get('token');
export const isLoggedIn   = state => !!getAuthToken(state);
