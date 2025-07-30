import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/LocalStorage';
import { IExpense } from '../interfaces/IExpense';

export const api = axios.create();

const endpoints = ['login'];

const checkEndpoint = (url: any) => {
  return endpoints.some((endpoint: any) => url.includes(endpoint));
};

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('auth')?.access_token;
    config.baseURL = process.env.REACT_APP_BASE_URL;

    if (token && !checkEndpoint(config?.url)) {
      config.headers['Authorization'] = token;
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

export const getExpenses = (type?: number) => {
  return api
    .get(`expenses${type ? `?type=${type}` : ''}`)
    .then((response) => response)
    .catch((err) => err);
};

export const newExpense = (expense: IExpense) => {
  return api
    .post(`expenses`, { ...expense, userId: getLocalStorage('userId') })
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const updateExpense = (expense: IExpense) => {
  return api
    .put(`expenses/${expense.id}`, expense)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const deleteExpense = (id: string) => {
  return api
    .delete(`expenses/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};
