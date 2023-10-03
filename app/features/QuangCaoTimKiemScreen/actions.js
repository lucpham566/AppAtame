import * as types from './constants';

export const getAdsReport = data => {
  return {
    type: types.GET_ADS_REPORT,
    payload: {
      data,
    },
  };
};

export const getAdsReportDone = data => {
  return {
    type: types.GET_ADS_REPORT_DONE,
    payload: {
      data,
    },
  };
};

export const getProductAdsList = data => {
  return {
    type: types.BAOCAO_GET_PRODUCT_ADS_LIST,
    payload: {
      data,
    },
  };
};

export const getProductAdsListDone = data => {
  return {
    type: types.BAOCAO_GET_PRODUCT_ADS_LIST_DONE,
    payload: {
      data,
    },
  };
};

export const updateAdsState = (data, callback) => {
  return {
    type: types.UPDATE_ADS_STATE,
    payload: {
      data,
      callback,
    },
  };
};

export const updateAdsStateDone = data => {
  return {
    type: types.UPDATE_ADS_STATE_DONE,
    payload: {
      data,
    },
  };
};
