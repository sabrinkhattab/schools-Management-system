import Axios from 'axios';
let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE3MDIwNTkxLCJqdGkiOiJkYWM4ZmRiYmZlMjA0YTAzODcwNmQ1ZTdjZGE2YjhlNiIsInVzZXJfaWQiOjF9.0sbNh51tgjENgoOB3E02Aqm2i-u8NBhh46hOvMxWB4Q'
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
