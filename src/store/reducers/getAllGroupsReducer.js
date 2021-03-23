import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    groups: null,
    getAllGroupsError: null
};

const getAllGroupsReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_GROUPS_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                getAllGroupsError: null
            };
        case actionTypes.GET_ALL_GROUPS_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                getAllGroupsError: null,
                groups: action.groups
            };
        case actionTypes.GET_ALL_GROUPS_FAIL:
            return {
                ...state,
                IsLoading: false,
                getAllGroupsError: action.error
            };
        default:
            return { ...state };
    }
};

export default getAllGroupsReducer;
