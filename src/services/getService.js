import Axios from 'axios';
import { getItemFromLocalStorage } from '../../src/helpers/localStorage';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE2NTgzMTMyLCJqdGkiOiJhMzZjOWZlM2YyMjA0Y2JkYjE2ZTFmYzI3MjUwYTVjMyIsInVzZXJfaWQiOjF9.A1BLbhMWipqRZkPXNfQYJA4Frog9h9dW6XAYtkaIzQw'

const getService = (
    route,
    headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
    }
) => {
    // console.log('test', `${route}`)
    return Axios.get(`${process.env.REACT_APP_SERVER_URL}${route}`, {
        headers: headers
    });
};

export default getService;
