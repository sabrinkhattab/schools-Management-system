import * as actionTypes from '../actions/actionsTypes';

const initState = {
    singInIsLoading: false,
    refreshToken: null,
    accessToken: null,
    signInError: null
};

const signInReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SIGNIN_TRIGGER:
            return {
                ...state,
                singInIsLoading: true,
                signInError: null
            };
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                singInIsLoading: false,
                signInError: null,
                refreshToken: action.refreshToken,
                accessToken: action.accessToken
            };
        case actionTypes.SIGNIN_FAIL:
            return {
                ...state,
                singInIsLoading: false,
                signInError: action.error
            };
        default:
            return { ...state };
    }
};

export default signInReducer;
