import axiosService from '../commons/axiosService';
import { urlServer, urlServerTiktok } from '../commons/server';

const url = urlServer + '/api/';

export const getShopListApi = () => {
  return axiosService.get(url + 'shop-manager/shop?channel=shopee_marketing');
};

export const getGoiSanPhamApi = () => {
  return axiosService.get(url + 'store/product-pack');
};

export const getTiktokAccountListApi = () => {
  return axiosService.get(urlServerTiktok + '/api/' + 'v1/tiktok_accounts');
};


export const getAdsAccountListApi = (tiktok_account_id) => {
  return axiosService.get(urlServerTiktok + '/api/' + 'v1/ads_accounts/' + tiktok_account_id);
};

export const addDeviceTokenApi = (device_token) => {
  return axiosService.post(urlServerTiktok + '/api/' + 'v1/user_role/device', {
    device_token
  });
};


export const removeDeviceTokenApi = (device_token) => {
  return axiosService.delete(urlServerTiktok + '/api/' + 'v1/ads_accounts/device', {
    device_token
  });
};