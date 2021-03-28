import * as actionTypes from './actionsTypes'
import { postService } from '../../services';

const removeGroupPermission = ({ group_id, permission_id }) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.REMOVE_GROUP_PERMISSION_TRIGGER });
        return postService('/accounts/remove_group_permission', {
            group_id,
            permission_id
        })
            .then(response => {
                // successfully 

                dispatch({
                    type: actionTypes.REMOVE_GROUP_PERMISSION_SUCCESS,
                    response: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                //  failed
                dispatch({ type: actionTypes.REMOVE_GROUP_PERMISSION_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default removeGroupPermission;