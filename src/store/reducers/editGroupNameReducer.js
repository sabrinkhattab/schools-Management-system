import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    group: null,
    editGroupNameError: null
};

const editGroupNameReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_GROUP_NAME_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                editGroupNameError: null
            };
        case actionTypes.EDIT_GROUP_NAME_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                editGroupNameError: null,
                group: action.group
            };
        case actionTypes.EDIT_GROUP_NAME_FAIL:
            return {
                ...state,
                IsLoading: false,
                editGroupNameError: action.error
            };
        default:
            return { ...state };
    }
};

export default editGroupNameReducer;
