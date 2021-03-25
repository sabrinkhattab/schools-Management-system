import * as actionTypes from './actionsTypes'
import { postService } from '../../services';

const addUserToGroup = ({ group_id, user_id }) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ADD_USER_TO_GROUP_TRIGGER });
        return postService('/accounts/add_user_group', {
            group_id,
            user_id
        })
            .then(response => {
                // successfully 

                dispatch({
                    type: actionTypes.ADD_USER_TO_GROUP_SUCCESS,
                    user: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                //  failed
                dispatch({ type: actionTypes.ADD_USER_TO_GROUP_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default addUserToGroup;