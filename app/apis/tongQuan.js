import axiosService from '../commons/axiosService';
import {urlServer, urlServerNew} from '../commons/server';

const url = urlServer + '/api/';
const urlNew = urlServerNew + '/api/';

export const getShopReportApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/get_shop_report', {
    shop_id: data.id,
    period: data.optionFilter,
    date: data.date,
    month: data.month,
    year: data.year,
  });
};

export const getProductAdsListApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/get_campaign_list', {
    shop_id: data.id,
    offset: 0,
    limit: 100,
    period: data.optionFilter,
    campaign_type: data.campaign_type,
    campaign_state: 'ongoing',
    date: null,
    month: null,
    year: null,
  });
};

export const updateAdsState = data => {
  return axiosService.post(urlNew + 'service2/mobile/update_ads_state', {
    shop_id: data.id,
    campaign_ids: data.campaign_ids,
    state: data.state,
  });
};

export const updateAdsQuota = data => {
  return axiosService.post(urlNew + 'service2/mobile/update_ads_quota', {
    shop_id: data.id,
    campaign_ids: data.campaign_ids,
    total_quota: data.total_quota,
    daily_quota: data.daily_quota,
  });
};
