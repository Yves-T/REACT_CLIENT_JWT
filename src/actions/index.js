import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({email, password}) {
    return function (dispatch) {
        // submit email / password to the server
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then((response) => {
                // if the request is good
                // - update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - redirect to the protected page
                browserHistory.push('/feature');
            })
            .catch(() => {
                // if the request is bad
                // - show error to the user
                dispatch(authError('Bad login info'));
            });
    };
}

export function signupUser({email, password}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.tokenize);
                browserHistory.push('/feature');
            })
            .catch(error => {
                if (error.response) {
                    dispatch(authError(error.response.data.error));
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error', error.message);
                }
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    };
}