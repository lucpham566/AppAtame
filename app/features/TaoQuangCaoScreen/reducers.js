import * as types from './constants';

const initialState = {
  adsReport: {},
  productAdsList: [],
  showModalUpdateAds: false,
  idList: [],
  productList: [],
};

const taoQuangCaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_LIST:
      return {
        ...state,
        productList: [],
      };
    case types.GET_PRODUCT_LIST_DONE:
      const productList = [...action.payload.data];
      return {
        ...state,
        productList,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default taoQuangCaoReducer;
