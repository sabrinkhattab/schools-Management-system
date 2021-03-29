import * as actionTypes from './actionsTypes'
import { getService } from '../../services';

const getAllGroups = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_ALL_GROUPS_TRIGGER });
        return getService('/accounts/groups')
            .then(response => {
                // successfully get data

                dispatch({
                    type: actionTypes.GET_ALL_GROUPS_SUCCESS,
                    groups: response.data
                });

                return Promise.resolve(response);
            })
            .catch(error => {
                // get  data failed
                dispatch({ type: actionTypes.GET_ALL_GROUPS_FAIL, error: error.message });
                return Promise.reject(error);
            });

    };
};


export default getAllGroups;