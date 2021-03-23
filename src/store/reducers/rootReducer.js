import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import getSchoolLoginData from './getSchoolLoginDataReducer'
import getAllPermissions from './getAllPermissionsReducer'
import getAllGroupsReducer from './getAllGroupsReducer'
import getGroupUsers from './getGroupUsersReducer'
import removeUserFromGroup from './removeUserFromGroupReducer'

const rootReducer = combineReducers({
    signIn: signInReducer,
    schoolLoginData: getSchoolLoginData,
    permissions: getAllPermissions,
    groups: getAllGroupsReducer,
    groupUsers: getGroupUsers,
    removedUser: removeUserFromGroup
});

export default rootReducer;
