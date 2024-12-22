import Cookies from 'js-cookie';

export const setToken = (token: string) => {
  Cookies.set('authToken', token);
};


export const getToken = (): string | undefined => {
  return Cookies.get('authToken') as string | undefined; // explicitly cast the return type
};

export const removeToken = () => {
  Cookies.remove('authToken');
};
