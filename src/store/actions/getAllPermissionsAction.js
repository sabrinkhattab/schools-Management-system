import * as actionTypes from './actionsTypes'
import { getService } from '../../services';

const GetAllPermissions = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_ALL_PERMISSIONS_TRIGGER });
        return getService('/accounts/permissions')
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