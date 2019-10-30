import { combineReducers } from 'redux';

import { reducer as authReducer } from "reducers/auth.reducer";
import { reducer as registrationReducer } from "reducers/registration.reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
});