import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import getSchoolLoginData from './getSchoolLoginDataReducer'
import getAllPermissions from './getAllPermissionsReducer'
import getAllGroupsReducer from './getAllGroupsReducer'
import getGroupUsers from './getGroupUsersReducer'
import removeUserFromGroup from './removeUserFromGroupReducer'
import addUserToGroup from './addUserToGroupReducer'
import listAllUsers from './listAllUsersReducer'
import deleteGroup from './deleteGroupReducer'
import editGroupName from './editGroupNameReducer'
import createNewGroup from './createNewGroupReducer'
import addGroupPermission from './addGroupPermissionReducer'
import removeGroupPermission from './removeGroupPermissionReducer'

const rootReducer = combineReducers({
    signIn: signInReducer,
    schoolLoginData: getSchoolLoginData,
    permissions: getAllPermissions,
    groups: getAllGroupsReducer,
    groupUsers: getGroupUsers,
    removedUser: removeUserFromGroup,
    addedUser: addUserToGroup,
    AllUsers: listAllUsers,
    deletedGroup: deleteGroup,
    editedGroup: editGroupName,
    newGroup: createNewGroup,
    addedPermissionToGroup: addGroupPermission,
    removedPermission: removeGroupPermission
});

export default rootReducer;
