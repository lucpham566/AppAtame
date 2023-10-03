import axiosService from '../commons/axiosService';
import {urlServer, urlServerNew} from '../commons/server';

const url = urlServer + '/api/';
const urlNew = urlServerNew + '/api/';

export const searchKeywordApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/search_keyword', {
    keyword: data.keyword,
  });
};

export const searchKeywordShopeeApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/search_shopee_keyword', {
    shop_id: data.shop_id,
    keyword: data.keyword,
    itemid: data.itemid,
  });
};

export const getKeywordFilesApi = data => {
  return axiosService.get(url + 'v1/shop-manager/marketing/keyword-file');
};

export const createKeywordFileApi = data => {
  return axiosService.post(url + 'v1/shop-manager/marketing/keyword-file', {
    filename: data.filename,
    keyword_json: data.keyword_json,
  });
};

export const getKeywordFileDetailApi = data => {
  return axiosService.get(
    url + 'v1/shop-manager/marketing/keyword-file/' + data.id,
  );
};
