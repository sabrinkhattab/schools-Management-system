import Axios from 'axios'

let token = localStorage.getItem('REACT_TOKEN_AUTH')
let _token = JSON.parse(token) || null;

let baseUrl = process.env.REACT_APP_SERVER_URL
let observers = [];



const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
        return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    // multiply by 1000 to convert seconds into milliseconds
    return jwt && jwt.exp && jwt.exp * 1000 || null;
};
const isExpired = (exp) => {
    if (!exp) {
        return false;
    }

    return Date.now() > exp;
};


export const getToken = async () => {
    if (!_token) {
        return null;
    }

    if (isExpired(getExpirationDate(_token.accessToken))) {
        const updatedToken = Axios.post(`${baseUrl}/accounts/get_refresh_token`, {
            "refresh": _token.refreshToken
        }, {
            headers: {
                Authorization: `Bearer${_token.accessToken}`
            }
        }
        ).then(r => r.json())
        setToken(updatedToken);

    }
    return _token && _token.accessToken;


};

export const isLoggedIn = () => {
    return !!_token;
};
const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach(observer => observer(isLogged));
};

export const setToken = (token) => {
    if (token) {
        localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
    } else {
        localStorage.removeItem('REACT_TOKEN_AUTH');
    }
    _token = token;
    notify();
};
export const subscribe = (observer) => {
    observers.push(observer);
};

export const unsubscribe = (observer) => {
    observers = observers.filter(_observer => _observer !== observer);
};