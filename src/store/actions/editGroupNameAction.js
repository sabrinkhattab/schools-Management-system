import * as actionTypes from './actionsTypes'
import { putService } from '../../services';

const editGroupName = (groupId, { name }) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.EDIT_GROUP_NAME_TRIGGER });
        return putService(`/accounts/edit_group/${groupId}`, {
            name
        })
            .then(response => {
                // successfully get data

                dispatch({
                    type: actionTypes.EDIT_GROUP_NAME_SUCCESS,
                    group: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                // get  data failed
                dispatch({ type: actionTypes.EDIT_GROUP_NAME_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default editGroupName;