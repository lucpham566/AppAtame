import * as types from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  shopList: [],
  goiSanPham: {},
  currentShopId: null,
  currentShop: {},
  showModalSelectShop: false,
  shopReportHome: {},
  adsReportHome: {},
  adsPerformance: {},
  lowQuotaCampaignIds: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SHOP_LIST:
      const currentShopId = action.payload.data;
      return {
        ...state,
        currentShopId,
      };
    case types.GET_SHOP_LIST_DONE:
      const { data } = action.payload;
      let defaultShop = {};
      if (state.currentShopId) {
        defaultShop = data?.find(i => i._id == state.currentShopId);
      } else {
        defaultShop = data?.find(i => i.extra_data?.default);
      }
      if (defaultShop && defaultShop._id) {
        return {
          ...state,
          currentShop: defaultShop,
          shopList: data,
        };
      }
      return {
        ...state,
        shopList: data,
      };
    case types.SET_SHOP:
      const shopId = action.payload.data.shopId;
      const shop = state.shopList?.find(i => i._id == shopId);
      return {
        ...state,
        currentShop: shop,
      };
    case types.GET_GOI_SANPHAM_DONE:
      const goiSanPham = action.payload.data;
      return {
        ...state,
        goiSanPham,
      };
    case types.SHOW_MODAL_SELECT_SHOP:
      return {
        ...state,
        showModalSelectShop: true,
      };
    case types.HIDE_MODAL_SELECT_SHOP:
      return {
        ...state,
        showModalSelectShop: false,
      };
    case types.SHOW_MODAL_PROMPT:
      return {
        ...state,
        showModalSelectShop: true,
      };
    case types.HIDE_MODAL_PROMPT:
      return {
        ...state,
        showModalSelectShop: false,
      };
    case types.GET_SHOP_REPORT_HOME_DONE:
      const shopReportHome = { ...action.payload.data };
      return {
        ...state,
        shopReportHome,
      };
    case types.GET_ADS_REPORT_HOME_DONE:
      const adsReportHomeData = [...action.payload.data];
      let gmv = 0;
      let click = 0;
      let cost = 0;
      let broad_cir = 0;
      let cpc = 0;
      let impression = 0;
      adsReportHomeData?.map(i => {
        gmv += i.broad_gmv;
        cost += i.cost;
        click += i.click;
        broad_cir += i.broad_cir;
        cpc += i.cpc;
        impression += i.impression
      });
      return {
        ...state,
        adsReportHome: {
          gmv,
          click,
          cost,
          broad_cir,
          cpc,
          impression
        },
      };
    case types.GET_ADS_PERFORMANCE_DONE:
      const adsPerformance = { ...action.payload.data };
      if (adsPerformance.low_quota?.campaign_ids) {
        lowQuotaCampaignIds = adsPerformance.low_quota?.campaign_ids;
      }
      return {
        ...state,
        adsPerformance,
        lowQuotaCampaignIds,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default accountReducer;
