import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    group: null,
    createNewGroupError: null
};

const createNewGroupReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_NEW_GROUP_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                createNewGroupError: null
            };
        case actionTypes.CREATE_NEW_GROUP_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                createNewGroupError: null,
                group: action.group
            };
        case actionTypes.CREATE_NEW_GROUP_FAIL:
            return {
                ...state,
                IsLoading: false,
                createNewGroupError: action.error
            };
        default:
            return { ...state };
    }
};

export default createNewGroupReducer;
