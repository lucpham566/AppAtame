import * as types from './constants';

export const getAdsDetail = data => {
  return {
    type: types.GET_ADS_DETAIL,
    payload: {
      data,
    },
  };
};

export const getAdsDetailDone = data => {
  return {
    type: types.GET_ADS_DETAIL_DONE,
    payload: {
      data,
    },
  };
};

export const getCampaignReport = data => {
  return {
    type: types.GET_CAMPAIGN_REPORT,
    payload: {
      data,
    },
  };
};

export const getCampaignReportDone = data => {
  return {
    type: types.GET_CAMPAIGN_REPORT_DONE,
    payload: {
      data,
    },
  };
};

export const getCampaignReportCompare = data => {
  return {
    type: types.GET_CAMPAIGN_REPORT_COMPARE,
    payload: {
      data,
    },
  };
};

export const getCampaignReportCompareDone = data => {
  return {
    type: types.GET_CAMPAIGN_REPORT_COMPARE_DONE,
    payload: {
      data,
    },
  };
};

export const removeCampaignReportCompare = data => {
  return {
    type: types.REMOVE_CAMPAIGN_REPORT_COMPARE,
    payload: {
      data,
    },
  };
};

export const updateKeywordState = (data, callback) => {
  return {
    type: types.UPDATE_KEYWORD_STATE,
    payload: {
      data,
      callback,
    },
  };
};

export const updateKeywordStateDone = (data, callback) => {
  return {
    type: types.UPDATE_KEYWORD_STATE_DONE,
    payload: {
      data,
      callback,
    },
  };
};

export const addKeywordAds = (data, callback) => {
  return {
    type: types.ADD_KEYWORD_ADS,
    payload: {
      data,
      callback,
    },
  };
};

export const addKeywordAdsDone = (data, callback) => {
  return {
    type: types.ADD_KEYWORD_ADS_DONE,
    payload: {
      data,
      callback,
    },
  };
};

export const updatePremiumRate = (data, callback) => {
  return {
    type: types.UPDATE_ADS_PREMIUM_RATE,
    payload: {
      data,
      callback,
    },
  };
};

export const updatePremiumRateDone = (data, callback) => {
  return {
    type: types.UPDATE_ADS_PREMIUM_RATE_DONE,
    payload: {
      data,
      callback,
    },
  };
};

export const showModalUpdatePremiumRate = (data, callback) => {
  return {
    type: types.SHOW_MODAL_UPDATE_PREMIUM_RATE,
    payload: {
      data,
      callback,
    },
  };
};

export const hideModalUpdatePremiumRate = (data, callback) => {
  return {
    type: types.HIDE_MODAL_UPDATE_PREMIUM_RATE,
    payload: {
      data,
      callback,
    },
  };
};

export const updateAdsBasePrice = (data, callback) => {
  return {
    type: types.UPDATE_ADS_BASE_PRICE,
    payload: {
      data,
      callback,
    },
  };
};

export const updateAdsBasePriceDone = (data, callback) => {
  return {
    type: types.UPDATE_ADS_BASE_PRICE_DONE,
    payload: {
      data,
      callback,
    },
  };
};
