import * as actionTypes from './actionsTypes'
import { deleteService } from '../../services';
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../helpers/localStorage'

const deleteGroup = (groupId) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.DELETE_GROUP_TRIGGER });
        return deleteService(`/accounts/delete_group/${groupId}`)
            .then(response => {
                // successfully 

                dispatch({
                    type: actionTypes.DELETE_GROUP_SUCCESS,
                    user: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                //  failed
                dispatch({ type: actionTypes.DELETE_GROUP_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default deleteGroup;