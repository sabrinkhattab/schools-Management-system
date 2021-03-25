import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    user: null,
    addUserToGroupError: null
};

const addUserToGroupReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER_TO_GROUP_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                addUserToGroupError: null
            };
        case actionTypes.ADD_USER_TO_GROUP_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                addUserToGroupError: null,
                user: action.groups
            };
        case actionTypes.ADD_USER_TO_GROUP_FAIL:
            return {
                ...state,
                IsLoading: false,
                addUserToGroupError: action.error
            };
        default:
            return { ...state };
    }
};

export default addUserToGroupReducer;
