import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    user: null,
    deleteGroupError: null
};

const deleteGroupReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_GROUP_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                deleteGroupError: null
            };
        case actionTypes.DELETE_GROUP_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                deleteGroupError: null,
                user: action.user
            };
        case actionTypes.DELETE_GROUP_FAIL:
            return {
                ...state,
                IsLoading: false,
                deleteGroupError: action.error
            };
        default:
            return { ...state };
    }
};

export default deleteGroupReducer;
