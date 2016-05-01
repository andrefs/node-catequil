import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';
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

export function loadAuth(redirectPath) {
    return (dispatch) => {
        const token = window.localStorage.getItem('token');
        if(token){
            fetch('/api/user', token)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(user => {
                dispatch(loadAuthFinished({token, user}));
                if(redirectPath){
                    dispatch(push(redirectPath));
                }
            })
            .catch((err) => {
                dispatch(push('/'));
            });
        }
    };
};

export function login(data) {
    return (dispatch) => {
        dispatch(loginRequest(data));

        fetch('/login', null, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((payload) => {
            window.localStorage.setItem('token', payload.token);
            dispatch(loginSuccess(payload));
            dispatch(push('/chat'));
        })
        .catch((err) => {
            dispatch(loginFailure(err));
        });
    };
};


export function register(data) {
    return (dispatch) => {
        dispatch(registerRequest(data));

        fetch('/register', null, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((payload) => {
            window.localStorage.setItem('token', payload.token);
            dispatch(registerSuccess(payload));
            dispatch(push('/chat'));
        })
        .catch((err) => {
            dispatch(registerFailure(err));
        });
    };
};


export function logout() {
    return (dispatch) => {
        window.localStorage.removeItem('token');
        dispatch(logoutSuccess());
        dispatch(push('/'));
    };
};

const loadAuthFinished = createAction(AUTH_LOAD_FINISHED);
const loginRequest     = createAction(AUTH_LOGIN_REQUEST);
const loginSuccess     = createAction(AUTH_LOGIN_SUCCESS);
const loginFailure     = createAction(AUTH_LOGIN_FAILURE);


const registerRequest  = createAction(AUTH_REGISTER_REQUEST);
const registerSuccess  = createAction(AUTH_REGISTER_SUCCESS);
const registerFailure  = createAction(AUTH_REGISTER_FAILURE);

const logoutSuccess    = createAction(AUTH_LOGOUT_SUCCESS);

