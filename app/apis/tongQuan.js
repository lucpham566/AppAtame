import axiosService from '../commons/axiosService';
import { urlServer, urlServerNew, urlServerTiktok } from '../commons/server';

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


export const getReportApi = (data, tiktok_account_id) => {
  console.log(data, tiktok_account_id, "getReportApi data, tiktok_account_id");
  return axiosService.get(urlServerTiktok + '/api/v1/report/get/' + tiktok_account_id, {
    params: {
      order_field: data.order_field,
      order_type: data.order_type,
      page_size: data.page_size,
      page: data.page,
      advertiser_id: data.advertiser_id,
      type: data.type,
      report_type: data.report_type,
      start_date: data.start_date,
      end_date: data.end_date,
      filtering: data.filtering,
      metrics: data.metrics,
    }
  });
};


export const updateCampaginStatus = (data, tiktok_account_id) => {
  console.log(data, "updateCampaginStatus");
  return axiosService.post(urlServerTiktok + '/api/v1/campaigns/status/' + tiktok_account_id, {
    advertiser_id: data.advertiser_id,
    belong_to_atosa: data.belong_to_atosa,
    campaign_ids: data.ids,
    operation_status: data.operation_status,
  });
};

export const updateAdgroupStatus = (data, tiktok_account_id) => {
  return axiosService.post(urlServerTiktok + '/api/v1/ads_groups/status/' + tiktok_account_id, {
    advertiser_id: data.advertiser_id,
    belong_to_atosa: data.belong_to_atosa,
    campaign_ids: data.ids,
    operation_status: data.operation_status,
  });
};

export const updateAdsStatus = (data, tiktok_account_id) => {
  return axiosService.post(urlServerTiktok + '/api/v1/ads/status/' + tiktok_account_id, {
    advertiser_id: data.advertiser_id,
    belong_to_atosa: data.belong_to_atosa,
    campaign_ids: data.ids,
    operation_status: data.operation_status,
  });
};

export const createAutomatedRule = (data, tiktok_account_id) => {
  return axiosService.post(urlServerTiktok + '/api/v1/auto_ads/automated_rule/create/' + tiktok_account_id, {
    advertiser_id: data.advertiser_id,
    rules: data.rules
  });
};
