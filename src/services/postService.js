import Axios from 'axios';
// import { getItemFromLocalStorage } from 'helpers';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE2NTgzMTMyLCJqdGkiOiJhMzZjOWZlM2YyMjA0Y2JkYjE2ZTFmYzI3MjUwYTVjMyIsInVzZXJfaWQiOjF9.A1BLbhMWipqRZkPXNfQYJA4Frog9h9dW6XAYtkaIzQw'
const postService = (
    route,
    data,
    headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
    }
) => {
    return Axios.post(
        `${process.env.REACT_APP_SERVER_URL}${route}`,
        { ...data },
        { headers: headers }
    );
};

export default postService;
