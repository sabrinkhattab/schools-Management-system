import * as actionTypes from './actionsTypes'
import { deleteService } from '../../services';
import Axios from 'axios'
let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE2NzQ5OTY5LCJqdGkiOiI0Njg3NzFmODhkNWM0YmQ4OTg1MzI2MjhlZjkyMGZkYiIsInVzZXJfaWQiOjF9.JV9AIpK5EGVf6VAjR4doIRrC8Q2ruA9rk8aO-FpQ7TU'

const deleteGroup = (groupId) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.DELETE_GROUP_TRIGGER });
        return Axios.delete(`${process.env.REACT_APP_SERVER_URL}/accounts/delete_group/${groupId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
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