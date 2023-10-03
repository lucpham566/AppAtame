import * as types from './constants';

const initialState = {
  shopReport: {},
  shopReportCompare: {},
  productAdsList: [],
};

const tongQuanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SHOP_REPORT_DONE:
      const shopReport = {...action.payload.data};
      return {
        ...state,
        shopReport,
      };
    case types.GET_SHOP_REPORT_COMPARE_DONE:
      const shopReportCompare = {...action.payload.data};
      return {
        ...state,
        shopReportCompare,
      };
    case types.REMOVE_SHOP_REPORT_COMPARE:
      return {
        ...state,
        shopReportCompare: {},
      };
    case types.GET_PRODUCT_ADS_LIST_DONE:
      const productAdsList = [...action.payload.data];
      return {
        ...state,
        productAdsList:productAdsList.filter(i => i.campaign.type !== 'shop'),
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default tongQuanReducer;
