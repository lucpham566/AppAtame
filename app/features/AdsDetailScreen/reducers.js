import * as types from './constants';

const initialState = {
  adsDetail: {},
  campaignReport: [],
  campaignReportCompare: [],
  keywordList: [],
  itemid: '',
  advertisements: [],
  showModalUpdatePremiumRate: false,
  modalPlacement: 0,
};

const adsDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADS_DETAIL:
      return {
        ...state,
        adsDetail: {},
        keywordList: [],
        placement: [],
        itemid: '',
        advertisements: [],
      };
    case types.GET_ADS_DETAIL_DONE:
      const adsDetail = { ...action.payload.data };
      const advertisements = adsDetail.advertisements;
      const advertisement = adsDetail.advertisements?.find(
        i => i.placement == 0,
      );
      let keywordList = advertisement?.extinfo.keywords
        ? advertisement?.extinfo.keywords
        : [];

      const placement = adsDetail.advertisements.map(i => i.placement);
      const itemid = adsDetail.advertisements[0].itemid;
      return {
        ...state,
        adsDetail,
        keywordList,
        placement,
        itemid,
        advertisements,
      };
    case types.GET_CAMPAIGN_REPORT_DONE:
      const campaignReport = [...action.payload.data];
      return {
        ...state,
        campaignReport,
      };
    case types.GET_CAMPAIGN_REPORT_COMPARE_DONE:
      const campaignReportCompare = [...action.payload.data];
      return {
        ...state,
        campaignReportCompare,
      };
    case types.REMOVE_SHOP_REPORT_COMPARE:
      console.log('remove compare');
      return {
        ...state,
        campaignReportCompare: [],
      };
    case types.UPDATE_KEYWORD_STATE_DONE:
      const data = state.keywordList;
      const keyword_list = action.payload.data.keyword_list;
      keywordList = data.map(i => {
        const item = keyword_list.find(e => e.keyword === i.keyword);
        if (item && item.keyword) {
          return { ...i, status: item.status, price: item.price };
        }
        return i;
      });
      return {
        ...state,
        keywordList,
      };
    case types.ADD_KEYWORD_ADS_DONE:
      const newKeywordList = action.payload.data.keyword_list;
      keywordList = newKeywordList.concat(state.keywordList);
      return {
        ...state,
        keywordList,
      };
    case types.SHOW_MODAL_UPDATE_PREMIUM_RATE:
      const modalPlacement = action.payload.data.placement;
      return {
        ...state,
        showModalUpdatePremiumRate: true,
        modalPlacement,
      };
    case types.HIDE_MODAL_UPDATE_PREMIUM_RATE:
      return {
        ...state,
        showModalUpdatePremiumRate: false,
        modalPlacement: 0,
      };
    case types.UPDATE_ADS_PREMIUM_RATE_DONE:
      const pl = action.payload.data.placement;
      const vl = action.payload.data.premium_rate;
      const newAdvertisement = state.advertisements.find(
        i => i.placement === pl,
      );
      if (newAdvertisement) {
        newAdvertisement.extinfo.target.premium_rate = vl;
      } else {
      }
      const newAdvertisements = state.advertisements.map(i => {
        if (i.placement === pl) {
          return { ...newAdvertisement };
        }
        return i;
      });
      return {
        ...state,
        advertisements: [...newAdvertisements],
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default adsDetailReducer;
