import Axios from 'axios';
// import { getItemFromLocalStorage } from 'helpers';

// const userToken = getItemFromLocalStorage('userToken');

const postService = (
    route,
    data,
    headers = {
        'Content-Type': 'application/json',
        // Authorization: `${userToken}`
    }
) => {
    return Axios.post(
        `${process.env.REACT_APP_SERVER_URL}${route}`,
        { ...data },
        { headers: headers }
    );
};

export default postService;
