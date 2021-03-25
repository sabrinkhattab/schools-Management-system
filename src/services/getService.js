import Axios from 'axios';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE2NzQ5OTY5LCJqdGkiOiI0Njg3NzFmODhkNWM0YmQ4OTg1MzI2MjhlZjkyMGZkYiIsInVzZXJfaWQiOjF9.JV9AIpK5EGVf6VAjR4doIRrC8Q2ruA9rk8aO-FpQ7TU'
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
