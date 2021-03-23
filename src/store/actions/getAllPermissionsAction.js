import * as actionTypes from './actionsTypes'
import { getService } from '../../services';
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../helpers/localStorage'
import Axios from 'axios';

const GetAllPermissions = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_ALL_PERMISSIONS_TRIGGER });
        return Axios.get('https://run.mocky.io/v3/c09d4401-3780-43b4-aff1-f16d242d2721')
            .then(response => {
                // successfully get data

                dispatch({
                    type: actionTypes.GET_ALL_PERMISSIONS_SUCCESS,
                    permissions: response.data
                });

                return Promise.resolve('get all permissions successfully');
            })
            .catch(error => {
                // get  data failed
                dispatch({ type: actionTypes.GET_ALL_PERMISSIONS_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default GetAllPermissions;