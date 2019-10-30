import { createAction } from "redux-actions";
import axios from "axios";
import { endpoints } from '../../endpoints';

export const loadStart = createAction('[Reg] Load start');
export const dataRecieved = createAction('[Reg] Data recieved');
export const errorOccured = createAction('[Reg] Error occured');
export const clearErrors = createAction('[Reg] Clear Errors');
export const clearMessage = createAction('[Reg] Clear Message');

export const registration = (...obj) => (dispatch) => {
    const { email, password, name, phone, organization } = obj[0];

    dispatch(loadStart());

    const params = new URLSearchParams;
    params.append('email', email);
    params.append('password', password);
    params.append('name', name);
    params.append('phone', phone);
    params.append('organization', organization);

    axios.post(endpoints.user, params, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            console.log(response);
            const { data } = response;
            dispatch(dataRecieved(data));
        })
        .catch(error => {
            dispatch(errorOccured(error));
        });
};

export const cleanErrors = () => (dispatch) => {
    setTimeout(() => {
        dispatch(clearErrors());
    }, 5000);
};

export const cleanMessage = () => (dispatch) => {
    dispatch(clearMessage());
};