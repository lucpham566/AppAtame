import * as types from './constants';

const initialState = {
  adsReport: {},
  productAdsList: [],
  // productAdsListOutOfBudget: [],
  showModalUpdateAds: false,
  idList: [],
};

const baoCaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADS_REPORT_DONE:
      const adsReportData = [...action.payload.data];
      let gmv = 0;
      let click = 0;
      let cost = 0;
      let order_amount = 0;
      let order = 0;
      let checkout = 0;
      let impression = 0;
      adsReportData?.map(i => {
        gmv += i.broad_gmv;
        cost += i.cost;
        click += i.click;
        order_amount += i.order_amount;
        order += i.order;
        checkout += i.checkout;
        impression += i.impression;
      });
      return {
        ...state,
        adsReport: {
          gmv,
          click,
          cost,
          order_amount,
          impression,
          order,
          checkout,
        },
      };

    case types.BAOCAO_GET_PRODUCT_ADS_LIST_DONE:
      const productAdsList = [...action.payload.data];
      return {
        ...state,
        productAdsList: productAdsList.filter(i => i.campaign.type !== 'shop'),
        // productAdsListOutOfBudget: productAdsList.filter(i => {
        //   if (i.campaign.type !== 'shop' && i.campaign?.total_quota != 0) {
        //     if (i.campaign.total_quota - i.campaign.total_expense < 30000) {
        //       return true;
        //     }
        //   }
        //   return false;
        // }),
      };

    case types.SHOW_MODAL_UPDATE:
      const idList = [...action.payload.data];
      return {
        ...state,
        showModalUpdateAds: true,
        idList,
      };
    case types.HIDE_MODAL_UPDATE:
      return {
        ...state,
        showModalUpdateAds: false,
        idList: [],
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default baoCaoReducer;
