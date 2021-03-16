import Axios from 'axios';
import { getItemFromLocalStorage } from '../../src/helpers/localStorage';

const userToken = getItemFromLocalStorage('userToken');

const getService = (
    route,
    headers = {
        'Content-Type': 'application/json',
        Authorization: `${userToken}`
    }
) => {
    // console.log('test', `${route}`)
    return Axios.get(`${process.env.REACT_APP_SERVER_URL}${route}`, {
        headers: headers
    });
};

export default getService;
