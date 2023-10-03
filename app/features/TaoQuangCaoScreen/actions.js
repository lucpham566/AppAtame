import * as types from './constants';

export const getProductList = data => {
  return {
    type: types.GET_PRODUCT_LIST,
    payload: {
      data,
    },
  };
};

export const getProductListDone = data => {
  return {
    type: types.GET_PRODUCT_LIST_DONE,
    payload: {
      data,
    },
  };
};

export const createSearchAdsBySuggest = (data, callback) => {
  return {
    type: types.CREATE_SEARCH_ADS_BY_SUGGEST,
    payload: {
      data,
      callback,
    },
  };
};

export const createSearchAdsBySuggestDone = data => {
  return {
    type: types.CREATE_SEARCH_ADS_BY_SUGGEST_DONE,
    payload: {
      data,
    },
  };
};
