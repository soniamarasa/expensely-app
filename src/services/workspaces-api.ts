import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/LocalStorage';
import { IWorkspace } from '../interfaces/IWorkspace';

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

export const getWorkspaces = (type?: number) => {
  return api
    .get(`workspaces${type ? `?type=${type}` : ''}`)
    .then((response) => response)
    .catch((err) => err);
};



export const newWorkspace = (workspace: IWorkspace) => {
  return api
    .post(`workspaces`, {...workspace, userId: getLocalStorage('userId')})
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const updateWorkspace = (workspace: IWorkspace) => {
  return api
    .put(`workspaces/${workspace.id}`, workspace)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const deleteWorkspace = (id: string) => {
  return api
    .delete(`workspaces/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};
