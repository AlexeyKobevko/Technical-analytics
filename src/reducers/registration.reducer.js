import { handleActions } from 'redux-actions';

import {loadStart, dataRecieved, errorOccured, clearErrors }  from 'actions/registration.action';

const initialState = {
    loading: false,
    error: false,
    errorText: '',
    message: '',
};

export const reducer = handleActions({
    [clearErrors]: (state) => {
        return {
            ...state,
            error: false,
            errorText: '',
        }
    },
    [loadStart]: (state) => {
        return {
            ...state,
            loading: true,
        }
    },
    [dataRecieved]: (state, action) => {
        const data = action.payload;
        if (data.status === 'ok') {
            return {
                ...state,
                message: data.message,
                loading: false,
            };
        }
    },
    [errorOccured]: (state, action) => {
        const { data } = action.payload.response;
        return {
            ...state,
            loading: false,
            error: true,
            errorText: data.message,
        };
    }
}, initialState);