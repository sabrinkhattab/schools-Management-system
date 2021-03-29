import * as actionTypes from './actionsTypes'
import Axios from 'axios'
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../helpers/localStorage'

const getSchoolLoginData = (school_url) => {
    console.log('from action', school_url)
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_SCHOOL_LOGIN_DATA_TRIGGER });
        return Axios.get(`${process.env.REACT_APP_SERVER_URL}/schools/${school_url}`)
            .then(response => {
                // successfully get data
                dispatch({
                    type: actionTypes.GET_SCHOOL_LOGIN_DATA_SUCCESS,
                    id: response.data.id,
                    welcome_message: response.data.welcome_message,
                    name: response.data.name,
                    logo: response.data.logo,
                    country: response.data.country
                });
                setItemInLocalStorage('schoolId', response.data.id)

                return Promise.resolve('get school data successfully');
            })
            .catch(error => {
                // get school data failed
                dispatch({ type: actionTypes.GET_SCHOOL_LOGIN_DATA_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default getSchoolLoginData;