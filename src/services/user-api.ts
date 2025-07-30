import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../helpers/LocalStorage';
import { IUser } from '../interfaces/IUser';

export const api = axios.create();

const endpoints = ['login'];

const checkEndpoint = (url: any) => {
  return endpoints.some((endpoint) => url.includes(endpoint));
};

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('auth')?.access_token;
    config.baseURL = import.meta.env.VITE_BASE_URL;

    if (token && !checkEndpoint(config.url)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      removeLocalStorage('auth');
      removeLocalStorage('userId');
      useNavigate();
      return;
    }
    return Promise.reject(error);
  }
);

export const createAccount = (user: IUser) => {
  return api
    .post('user', user)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data.detail;
    });
};

export const login = (data: any) => {
  return api
    .post('login', data)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
      return err.response?.data?.error || err.detail;
    });
};

export const retrievePassword = (data: any) => {
  return api
    .post('user/password/reset', data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data.detail;
    });
};

export const resetPassword = (newPassword: string, token: string) => {
  return api
    .put(
      'password/change',
      { new_password: newPassword, access_token: token },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => response)
    .catch((err) => {
      return err.response?.data?.error || err.detail;
    });
};

export const updatePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return api
    .put('user/password/update', data)
    .then((response) => response)
    .catch((err) => {
      return err.response?.data?.error || err.detail;
    });
};

export const getUser = () => {
  return api
    .get(`user/${getLocalStorage('userId')}`)
    .then((response) => response)
    .catch((err) => {
      return err.response.data.detail;
    });
};

export const updateUser = (user: IUser) => {
  return api
    .put(`user/${getLocalStorage('userId')}`, user)
    .then((response) => {
      let auth = getLocalStorage('auth');
      auth.user.name = response.data.name;

      setTimeout(() => {
        setLocalStorage('auth', auth);
      }, 100);

      return response;
    })
    .catch((err) => {
      return err.response.data.detail;
    });
};
