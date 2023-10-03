import axiosService from '../commons/axiosService';
import {urlServer, urlServerNew} from '../commons/server';

const url = urlServer + '/api/';
const urlNew = urlServerNew + '/api/';

export const getAdsReportApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/get_ads_report', {
    shop_id: data.id,
    type: data.type,
    period: data.optionFilter,
    date: null,
    month: null,
    year: null,
  });
};

export const getAdsPerformanceApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/get_ads_performance', {
    shop_id: data.id,
  });
};

export const getAdsDetailApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/get_campaign_detail', {
    shop_id: data.id,
    campaign_id: data.campaign_id,
    period: data.optionFilter,
    date: data.date,
    month: data.month,
    year: data.year,
  });
};

export const getCampaignReportApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/get_campaign_report', {
    shop_id: data.id,
    period: data.optionFilter,
    itemid: data.itemid,
    placement: data.placement,
    date: data.date,
    month: data.month,
    year: data.year,
  });
};

export const getProductListApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/product_selector', {
    shop_id: data.id,
    type: data.type,
  });
};

export const updateKeywordState = data => {
  return axiosService.post(urlNew + 'service2/mobile/update_keywords', {
    shop_id: data.id,
    campaign_id: data.campaign_id,
    keyword_list: data.keyword_list,
    placement: data.placement,
  });
};

export const createSearchAdsBySuggestApi = data => {
  return axiosService.post(
    urlNew + 'service2/mobile/create_search_ads/suggest',
    {
      shop_id: data.id,
      itemid_list: data.itemid_list,
    },
  );
};

export const createSearchAdsTargetingApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/create_targeting_ads', {
    shop_id: data.id,
    itemid_list: data.itemid_list,
    ads_list: data.ads_list,
    daily_quota: data.daily_quota,
    total_quota: data.total_quota,
  });
};

export const updateAdsPlacementApi = data => {
  return axiosService.post(urlNew + 'service2/mobile/targeting_change_status', {
    shop_id: data.id,
    campaignid: data.campaignid,
    placement: data.placement,
    status: data.status,
  });
};

export const updateAdsPremiumRateApi = data => {
  return axiosService.post(
    urlNew + 'service2/mobile/targeting_change_premium_rate',
    {
      shop_id: data.id,
      campaignid: data.campaignid,
      placement: data.placement,
      premium_rate: data.premium_rate,
    },
  );
};

export const updateAdsBasePriceApi = data => {
  return axiosService.post(
    urlNew + 'service2/mobile/targeting_change_base_price',
    {
      shop_id: data.id,
      campaignid: data.campaignid,
      base_price: data.base_price,
    },
  );
};
