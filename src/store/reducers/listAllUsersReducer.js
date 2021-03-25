import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    users: null,
    listAllUsersError: null
};

const listAllUsersReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LIST_ALL_USERS_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                listAllUsersError: null
            };
        case actionTypes.LIST_ALL_USERS_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                listAllUsersError: null,
                users: action.users
            };
        case actionTypes.LIST_ALL_USERS_FAIL:
            return {
                ...state,
                IsLoading: false,
                listAllUsersError: action.error
            };
        default:
            return { ...state };
    }
};

export default listAllUsersReducer;
