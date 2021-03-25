import Axios from 'axios';
let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE2NzQ5OTY5LCJqdGkiOiI0Njg3NzFmODhkNWM0YmQ4OTg1MzI2MjhlZjkyMGZkYiIsInVzZXJfaWQiOjF9.JV9AIpK5EGVf6VAjR4doIRrC8Q2ruA9rk8aO-FpQ7TU'
const deleteService = (
    route,
    data,
    headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
    }
) => {
    return Axios.delete(
        `${process.env.REACT_APP_SERVER_URL}${route}`,
        { ...data },
        { headers: headers }
    );
};

export default deleteService;
