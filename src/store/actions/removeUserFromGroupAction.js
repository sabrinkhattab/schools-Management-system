import * as actionTypes from './actionsTypes'
import { postService } from '../../services';
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../helpers/localStorage'

const removeUserFromGroup = ({ group_id, user_id }) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.REMOVE_USER_FROM_GROUP_TRIGGER });
        return postService('/accounts/remove_user_group', {
            group_id,
            user_id
        })
            .then(response => {
                // successfully 

                dispatch({
                    type: actionTypes.REMOVE_USER_FROM_GROUP_SUCCESS,
                    user: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                //  failed
                dispatch({ type: actionTypes.REMOVE_USER_FROM_GROUP_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default removeUserFromGroup;