import Cookies from  'js-cookie';

export const setTokenCookie = (token: string) => {
    Cookies.set('token', token, { expires: 7 }); // Set the token cookie to expire in 7 days
};

export const getTokenCookie = () => {
    return Cookies.get('token');
};

export const removeTokenCookie = () => {
    Cookies.remove('token');
};
