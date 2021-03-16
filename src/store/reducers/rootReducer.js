import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import getSchoolLoginData from './getSchoolLoginDataReducer'

const rootReducer = combineReducers({
    signIn: signInReducer,
    schoolLoginData: getSchoolLoginData
});

export default rootReducer;
