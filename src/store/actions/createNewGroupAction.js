import * as actionTypes from './actionsTypes'
import { postService } from '../../services';

const createNewGroup = ({ group, group_type }) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.CREATE_NEW_GROUP_TRIGGER });
        return postService('/accounts/create_group', {
            group,
            group_type
        })
            .then(response => {
                // successfully 

                dispatch({
                    type: actionTypes.CREATE_NEW_GROUP_SUCCESS,
                    group: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                //  failed
                dispatch({ type: actionTypes.CREATE_NEW_GROUP_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default createNewGroup;