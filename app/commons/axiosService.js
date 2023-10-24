import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../helpers/auth';
import { urlServer } from './server';

class axiosService {
  constructor() {
    let instance = axios.create({
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false,
      timeout: 30000,
      headers: {
        // Authorization: `Bearer ${getToken()}`,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });

    let active = false;
    instance.interceptors.response.use(response => {
      // const {code} = response.data;
      // if (code === 401 && active) {
      //   active = false;
      //   console.log(
      //     'get new token using refresh token',
      //     this.instance.defaults.headers,
      //   );
      //   this.refreshToken().then(rs => {
      //     console.log('get token refreshToken>>', rs.data);
      //     const token = rs.data.access_token;
      //     this.setToken(token);
      //     const config = response.config;
      //     config.headers['x-access-token'] = token;
      //     return instance(config);
      //   });
      // }

      return response;
    }, this.handleError);
    this.instance = instance;
  }

  setToken(token) {
    this.instance.defaults.headers.common['Authorization'] = `${token}`;
  }

  refreshToken() {
    console.log(getToken());
    axios.defaults.headers.common['Authorization'] = `${getToken()}`;
    return axios.post(urlServer + 'api/refresh');
  }

  handleSuccess(response) {
    return response;
  }

  handleError(err) {
    return Promise.reject(err);
  }

  get(url, body) {
    this.instance.defaults.headers.Authorization = `${getToken()}`;
    return this.instance.get(url, body);
  }

  post(url, body) {
    this.instance.defaults.headers.Authorization = `${getToken()}`;
    return this.instance.post(url, body);
  }

  put(url, body) {
    this.instance.defaults.headers.Authorization = `${getToken()}`;
    return this.instance.put(url, body);
  }

  delete(url) {
    this.instance.defaults.headers.Authorization = `${getToken()}`;
    return this.instance.delete(url);
  }
}

export default new axiosService();
