import Axios from 'axios';
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '../helpers/localStorage';

let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE2NjgxODMzLCJqdGkiOiJmZTUwNGNlZTM0ZTE0MWEzYjhmNWRkMWZmM2VlMzY1OSIsInVzZXJfaWQiOjF9.bHcW1C6dgTSK4Xxq9vF1SsCIZCgqSk_8JU7xI8BxehI'
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
