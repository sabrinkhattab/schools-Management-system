import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    groupPermissions: null,
    addGroupPermissionError: null
};

const addUserToGroupReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERMISSION_TO_GROUP_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                addGroupPermissionError: null
            };
        case actionTypes.ADD_PERMISSION_TO_GROUP_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                addGroupPermissionError: null,
                groupPermissions: action.groupPermissions
            };
        case actionTypes.ADD_PERMISSION_TO_GROUP_FAIL:
            return {
                ...state,
                IsLoading: false,
                addGroupPermissionError: action.error
            };
        default:
            return { ...state };
    }
};

export default addUserToGroupReducer;
