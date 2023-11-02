import * as types from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  shopList: [],
  adsAccountList: [],
  goiSanPham: {},
  currentShopId: null,
  currentShop: {},
  currentAdsAccountId: null,
  currentAdsAccount: null,
  showModalSelectShop: false,
  showModalSelectAdsAccount: false,
  showModalConfigNotify: false,
  ConfigNotifyId: "",
  ConfigNotifyData: "",
  ConfigNotifyApplyObjects: [
  ],
  shopReportHome: {},
  adsReportHome: {},
  adsPerformance: {},
  lowQuotaCampaignIds: [],
  report: {
    campaign: [],
    adgroup: [],
    ads: []
  }
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
      defaultShop = data[0];
      if (defaultShop && defaultShop.id) {
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
    case types.GET_ADS_ACCOUNT_LIST:
      return {
        ...state
      };
    case types.GET_ADS_ACCOUNT_LIST_DONE:
      {
        const { data } = action.payload;
        let defaultAdsAccount = {};
        if (state.currentAdsAccountId) {
          defaultAdsAccount = data?.find(i => i.advertiser_id == state.currentAdsAccountId);
        } else {
          defaultAdsAccount = data[0];
        }
        if (defaultAdsAccount && defaultAdsAccount.advertiser_id) {
          return {
            ...state,
            currentAdsAccount: defaultAdsAccount,
            adsAccountList: data,
          };
        }
        return {
          ...state,
          adsAccountList: data,
        };
      }
    case types.SET_SHOP:
      const shopId = action.payload.data.shopId;
      const shop = state.shopList?.find(i => i.id == shopId);
      return {
        ...state,
        currentShop: shop,
      };
    case types.SET_ADS_ACCOUNT:
      const advertiser_id = action.payload.advertiser_id;
      const adsAccount = state.adsAccountList?.find(i => i.advertiser_id == advertiser_id);
      return {
        ...state,
        currentAdsAccount: adsAccount,
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
    case types.SHOW_MODAL_SELECT_ADS_ACCOUNT:
      return {
        ...state,
        showModalSelectAdsAccount: true,
      };
    case types.HIDE_MODAL_SELECT_ADS_ACCOUNT:
      return {
        ...state,
        showModalSelectAdsAccount: false,
      };
    case types.SHOW_MODAL_CONFIG_NOTIFY:
      {
        const data = action.payload.data;
        const { ConfigNotifyId, ConfigNotifyData, ConfigNotifyApplyObject } = data;

        return {
          ...state,
          showModalConfigNotify: true,
          ConfigNotifyId,
          ConfigNotifyData,
          ConfigNotifyApplyObject
        };
      }
    case types.HIDE_MODAL_CONFIG_NOTIFY:
      return {
        ...state,
        showModalConfigNotify: false,
        ConfigNotifyId: null,
        ConfigNotifyData: null,
        ConfigNotifyApplyObjects: null
      };

    case types.GET_REPORT:
      return {
        ...state
      };
    case types.GET_REPORT_DONE:
      {
        const report_data = action.payload.data;
        return {
          ...state,
          report: report_data,
        };
      }
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
