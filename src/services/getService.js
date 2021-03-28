import Axios from 'axios';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE3MDIwNTkxLCJqdGkiOiJkYWM4ZmRiYmZlMjA0YTAzODcwNmQ1ZTdjZGE2YjhlNiIsInVzZXJfaWQiOjF9.0sbNh51tgjENgoOB3E02Aqm2i-u8NBhh46hOvMxWB4Q'
console.log('hello from get service')

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
