import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    response: null,
    removeGroupPermissionError: null
};

const removeGroupPermissionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REMOVE_GROUP_PERMISSION_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                removeGroupPermissionError: null
            };
        case actionTypes.REMOVE_GROUP_PERMISSION_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                removeGroupPermissionError: null,
                response: action.response
            };
        case actionTypes.REMOVE_GROUP_PERMISSION_FAIL:
            return {
                ...state,
                IsLoading: false,
                removeGroupPermissionError: action.error
            };
        default:
            return { ...state };
    }
};

export default removeGroupPermissionReducer;
