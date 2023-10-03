import axiosService from '../commons/axiosService';
import {urlServer} from '../commons/server';

const url = urlServer + '/api/';

export const getShopListApi = () => {
  return axiosService.get(url + 'shop-manager/shop?channel=shopee_marketing');
};

export const getGoiSanPhamApi = () => {
  return axiosService.get(url + 'store/product-pack');
};
