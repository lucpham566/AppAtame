import * as types from './constants';

const initialState = {
  adsReport: {},
  productAdsList: [],
};

const quangCaoTimKiemReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADS_REPORT_DONE:
      const adsReportData = [...action.payload.data];
      let gmv = 0;
      let click = 0;
      let cost = 0;
      adsReportData?.map(i => {
        gmv += i.broad_gmv;
        cost += i.cost;
        click += i.click;
      });
      return {
        ...state,
        adsReport: {
          gmv,
          click,
          cost,
        },
      };

    case types.BAOCAO_GET_PRODUCT_ADS_LIST_DONE:
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

export default quangCaoTimKiemReducer;
