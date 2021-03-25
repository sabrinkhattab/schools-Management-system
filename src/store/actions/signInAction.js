import * as actionTypes from './actionsTypes'
import { postService } from '../../services'
import { setItemInLocalStorage } from '../../helpers/localStorage'
const signInAction = ({ phone_number, password, sid }) => {
    console.log('tesst', { phone_number, password, sid })
    return (dispatch, getState) => {
        if (!phone_number || !password || !sid) {
            return Promise.reject(new Error('Please, enter your email or phone and password'));
        } else {
            dispatch({ type: actionTypes.SIGNIN_TRIGGER });
            return postService('/accounts/get_token', {
                phone_number,
                password,
                sid
            })
                .then(response => {
                    // successfully signed in
                    console.log(response);
                    dispatch({
                        type: actionTypes.SIGNIN_SUCCESS,
                        refreshToken: response.data.refresh,
                        accessToken: response.data.access
                    });
                    // set refreshtoken,and AccessToken in localStorage
                    let accessToken = response.data.access;
                    // refreshToken
                    let refreshToken = response.data.refresh;
                    setItemInLocalStorage('accessToken' , accessToken)
                    return Promise.resolve('Signed in successfully');
                },
                    error => {
                        dispatch({
                            type: actionTypes.SIGNIN_FAIL,
                            error: error.message
                        });
                        return Promise.reject(error);
                    }
                )
                .catch(error => {
                    //   sign in failed
                    dispatch({ type: actionTypes.SIGNIN_FAIL, error: error.message });
                    return Promise.reject(error);
                });
        }
    };

}

export default signInAction;