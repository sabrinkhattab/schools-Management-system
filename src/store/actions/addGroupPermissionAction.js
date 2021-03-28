import * as actionTypes from './actionsTypes'
import { postService } from '../../services';

const addGroupPermission = ({ group_id, permission_id }) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ADD_PERMISSION_TO_GROUP_TRIGGER });
        return postService('/accounts/add_group_permission', {
            group_id,
            permission_id
        })
            .then(response => {
                // successfully 

                dispatch({
                    type: actionTypes.ADD_PERMISSION_TO_GROUP_SUCCESS,
                    group: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                //  failed
                dispatch({ type: actionTypes.ADD_PERMISSION_TO_GROUP_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default addGroupPermission;