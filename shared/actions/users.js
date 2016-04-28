import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    USERS_FETCH_REQUEST,
    USERS_FETCH_SUCCESS,
    USERS_FETCH_FAILURE
} from '../constants';


export function fetchUsers(token) {
    return (dispatch) => {
        dispatch(usersRequest());

        return fetch('/api/users', token)
        .then(response => response.json())
        .then(users => {
            dispatch(usersSuccess({list:users}));
        })
        .catch(error => {
            throw error;
         });
    };
};

const usersSuccess = createAction(USERS_FETCH_SUCCESS);
const usersRequest = createAction(USERS_FETCH_REQUEST);
