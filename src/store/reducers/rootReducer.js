import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import getSchoolLoginData from './getSchoolLoginDataReducer'
import getAllPermissions from './getAllPermissionsReducer'
import getAllGroupsReducer from './getAllGroupsReducer'

const rootReducer = combineReducers({
    signIn: signInReducer,
    schoolLoginData: getSchoolLoginData,
    permissions: getAllPermissions,
    groups: getAllGroupsReducer
});

export default rootReducer;
