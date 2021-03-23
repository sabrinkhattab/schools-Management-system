import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    permissions: null,
    getAllPermissionsError: null
};

const getAllPermissionsReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PERMISSIONS_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                getAllPermissionsError: null
            };
        case actionTypes.GET_ALL_PERMISSIONS_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                getAllPermissionsError: null,
                permissions: action.permissions
            };
        case actionTypes.GET_ALL_PERMISSIONS_FAIL:
            return {
                ...state,
                IsLoading: false,
                getAllPermissionsError: action.error
            };
        default:
            return { ...state };
    }
};

export default getAllPermissionsReducer;
