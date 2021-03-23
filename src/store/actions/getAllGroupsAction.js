import * as actionTypes from './actionsTypes'
import { getService } from '../../services';
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../helpers/localStorage'
import Axios from 'axios';

const getAllGroups = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_ALL_GROUPS_TRIGGER });
        return Axios.get('https://run.mocky.io/v3/7de67173-0ca1-43d3-bc55-d82a31e4cc79')
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