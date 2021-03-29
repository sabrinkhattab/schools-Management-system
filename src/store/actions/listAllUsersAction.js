import * as actionTypes from './actionsTypes'
import { getService } from '../../services';

const listAllUsers = (groupId) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.LIST_ALL_USERS_TRIGGER });
        return getService(`/accounts/list_other_users/${groupId}`)
            .then(response => {
                // successfully 

                dispatch({
                    type: actionTypes.LIST_ALL_USERS_SUCCESS,
                    users: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                //  failed
                dispatch({ type: actionTypes.LIST_ALL_USERS_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default listAllUsers;