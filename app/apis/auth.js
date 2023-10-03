import axiosService from '../commons/axiosService';
import {urlServer} from '../commons/server';

const url = urlServer + '/api/';

export const loginApi = data => {
  return axiosService.post(url + 'shop-manager/sign', {
    version_no: 'atosa-client',
    username:data.username,
    password:data.password,
  });
};

// export const logoutApi = () => {
//   return axiosService.post(url + 'logoutApi');
// };

export const register = data => {
  return axiosService.post(url + 'register', data);
};

export const getUserInfoApi = () => {
  return axiosService.get(url + 'shop-manager/me');
};
