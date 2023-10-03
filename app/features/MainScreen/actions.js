import * as types from './constants';

export const getShopList = data => {
  return {
    type: types.GET_SHOP_LIST,
    payload: {
      data,
    },
  };
};

export const getShopListDone = data => {
  return {
    type: types.GET_SHOP_LIST_DONE,
    payload: {
      data,
    },
  };
};

export const setShop = data => {
  return {
    type: types.SET_SHOP,
    payload: {
      data,
    },
  };
};

export const getGoiSanPham = data => {
  return {
    type: types.GET_GOI_SANPHAM,
    payload: {
      data,
    },
  };
};

export const getGoiSanPhamDone = data => {
  return {
    type: types.GET_GOI_SANPHAM_DONE,
    payload: {
      data,
    },
  };
};

export const showModalSelectShop = data => {
  return {
    type: types.SHOW_MODAL_SELECT_SHOP,
    payload: {
      data,
    },
  };
};

export const hideModalSelectShop = data => {
  return {
    type: types.HIDE_MODAL_SELECT_SHOP,
    payload: {
      data,
    },
  };
};

export const getShopReportHome = data => {
  return {
    type: types.GET_SHOP_REPORT_HOME,
    payload: {
      data,
    },
  };
};

export const getShopReportHomeDone = data => {
  return {
    type: types.GET_SHOP_REPORT_HOME_DONE,
    payload: {
      data,
    },
  };
};

export const getAdsReportHome = data => {
  return {
    type: types.GET_ADS_REPORT_HOME,
    payload: {
      data,
    },
  };
};

export const getAdsReportHomeDone = data => {
  return {
    type: types.GET_ADS_REPORT_HOME_DONE,
    payload: {
      data,
    },
  };
};

export const getAdsPerformance = data => {
  return {
    type: types.GET_ADS_PERFORMANCE,
    payload: {
      data,
    },
  };
};

export const getAdsPerformanceDone = data => {
  return {
    type: types.GET_ADS_PERFORMANCE_DONE,
    payload: {
      data,
    },
  };
};
