import * as actionTypes from './actionsTypes'
import { getService } from '../../services';
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../helpers/localStorage'

const getGroupUsers = (groupId) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_GROUP_USERS_TRIGGER });
        return getService(`/accounts/list_group_users/${groupId}`)
            .then(response => {
                // successfully get data

                dispatch({
                    type: actionTypes.GET_GROUP_USERS_SUCCESS,
                    groupUsers: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                // get  data failed
                dispatch({ type: actionTypes.GET_GROUP_USERS_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default getGroupUsers;