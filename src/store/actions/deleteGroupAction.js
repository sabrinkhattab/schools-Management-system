import * as actionTypes from './actionsTypes'
import { deleteService } from '../../services';
import Axios from 'axios'
let token = localStorage.getItem('accessToken');

const deleteGroup = (groupId) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.DELETE_GROUP_TRIGGER });
        return Axios.delete(`${process.env.REACT_APP_SERVER_URL}/accounts/delete_group/${groupId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
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