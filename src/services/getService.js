import Axios from 'axios';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE2NjgxODMzLCJqdGkiOiJmZTUwNGNlZTM0ZTE0MWEzYjhmNWRkMWZmM2VlMzY1OSIsInVzZXJfaWQiOjF9.bHcW1C6dgTSK4Xxq9vF1SsCIZCgqSk_8JU7xI8BxehI'

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
