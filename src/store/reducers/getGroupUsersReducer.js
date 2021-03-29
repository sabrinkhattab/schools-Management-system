import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    groupUsers: null,
    getGroupUsersError: null
};

const getGroupUsersReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_GROUP_USERS_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                getGroupUsersError: null
            };
        case actionTypes.GET_GROUP_USERS_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                getGroupUsersError: null,
                groupUsers: action.groups
            };
        case actionTypes.GET_GROUP_USERS_FAIL:
            return {
                ...state,
                IsLoading: false,
                getGroupUsersError: action.error
            };
        default:
            return { ...state };
    }
};

export default getGroupUsersReducer;
