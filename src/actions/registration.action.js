import { createAction } from "redux-actions";
import axios from "axios";
import { endpoints } from '../../endpoints';

export const loadStart = createAction('[User] Load start');
export const dataRecieved = createAction('[User] Data recieved');
export const errorOccured = createAction('[User] Error occured');
export const clearErrors = createAction('[User] Clear Errors');

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