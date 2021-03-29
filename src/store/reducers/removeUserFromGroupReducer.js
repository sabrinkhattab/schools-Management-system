import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    user: null,
    removeGroupUserError: null
};

const removeUserFromGroupReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REMOVE_USER_FROM_GROUP_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                removeGroupUserError: null
            };
        case actionTypes.REMOVE_USER_FROM_GROUP_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                removeGroupUserError: null,
                user: action.user
            };
        case actionTypes.REMOVE_USER_FROM_GROUP_FAIL:
            return {
                ...state,
                IsLoading: false,
                removeGroupUserError: action.error
            };
        default:
            return { ...state };
    }
};

export default removeUserFromGroupReducer;
