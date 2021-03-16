import * as actionTypes from '../actions/actionsTypes';

const initState = {
    IsLoading: false,
    id: null,
    welcome_message: null,
    name: null,
    logo: null,
    getSchoolLoginDataError: null
};

const getSchoolLoginDataReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_SCHOOL_LOGIN_DATA_TRIGGER:
            return {
                ...state,
                IsLoading: true,
                getSchoolLoginDataError: null
            };
        case actionTypes.GET_SCHOOL_LOGIN_DATA_SUCCESS:
            return {
                ...state,
                IsLoading: false,
                getSchoolLoginDataError: null,
                id: action.id,
                welcome_message: action.welcome_message,
                name: action.name,
                logo: action.logo,
            };
        case actionTypes.GET_SCHOOL_LOGIN_DATA_FAIL:
            return {
                ...state,
                IsLoading: false,
                getSchoolLoginDataError: action.error
            };
        default:
            return { ...state };
    }
};

export default getSchoolLoginDataReducer;
