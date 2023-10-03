import * as types from './constants';

export const getShopReport = data => {
  return {
    type: types.GET_SHOP_REPORT,
    payload: {
      data,
    },
  };
};

export const getShopReportDone = data => {
  return {
    type: types.GET_SHOP_REPORT_DONE,
    payload: {
      data,
    },
  };
};

export const getShopReportCompare = data => {
  return {
    type: types.GET_SHOP_REPORT_COMPARE,
    payload: {
      data,
    },
  };
};

export const getShopReportCompareDone = data => {
  return {
    type: types.GET_SHOP_REPORT_COMPARE_DONE,
    payload: {
      data,
    },
  };
};

export const removeShopReportCompare = data => {
  return {
    type: types.REMOVE_SHOP_REPORT_COMPARE,
    payload: {
      data,
    },
  };
};

export const getProductAdsList = data => {
  return {
    type: types.GET_PRODUCT_ADS_LIST,
    payload: {
      data,
    },
  };
};

export const getProductAdsListDone = data => {
  return {
    type: types.GET_PRODUCT_ADS_LIST_DONE,
    payload: {
      data,
    },
  };
};
