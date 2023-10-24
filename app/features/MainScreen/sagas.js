import { call, put, takeEvery, delay } from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  hideLoadingGlobal,
  showLoadingGlobal,
} from './../globalFeatures/actions';
import {
  GET_ADS_ACCOUNT_LIST,
  GET_ADS_PERFORMANCE,
  GET_ADS_REPORT_HOME,
  GET_GOI_SANPHAM,
  GET_REPORT,
  GET_SHOP_LIST,
  GET_SHOP_REPORT_HOME,
} from './constants';
import { getAdsAccountListApi, getGoiSanPhamApi, getShopListApi, getTiktokAccountListApi } from './../../apis/account';
import {
  getAdsAccountListDone,
  getAdsPerformanceDone,
  getAdsReportHomeDone,
  getGoiSanPhamDone,
  getReportDone,
  getShopListDone,
  getShopReportHomeDone,
} from './actions';
import { getReportApi, getShopReportApi } from '../../apis/tongQuan';
import { getAdsPerformanceApi, getAdsReportApi } from '../../apis/ads';

function* watchGetListShopAction({ payload }) {
  try {
    const res = yield call(getShopListApi);
    const res_tiktok = yield call(getTiktokAccountListApi);
    console.log(res_tiktok.data, "res_tiktok.data watchGetListShopAction");

    if (res_tiktok.data && !res_tiktok.data.error && res_tiktok.data.data) {
      yield put(getShopListDone(res_tiktok.data.data.list));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetListAdsAccountAction({ payload }) {
  console.log("res_tiktok.data watchGetListAdsAccountAction");

  try {
    const res_tiktok = yield call(getAdsAccountListApi, payload.tiktok_account_id);

    if (res_tiktok.data && !res_tiktok.data.error && res_tiktok.data.data) {
      yield put(getAdsAccountListDone(res_tiktok.data.data));
    }
  } catch (error) {
    console.log(error, "watchGetListAdsAccountAction");
  }
}


function* watchGoiSanPhamAction({ payload }) {
  try {
    const res = yield call(getGoiSanPhamApi);
    if (res.data && !res.data.error) {
      yield put(getGoiSanPhamDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetShopReportHomeAction({ payload }) {
  const { data } = payload;
  try {
    const res = yield call(getShopReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getShopReportHomeDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetAdsReportHomeAction({ payload }) {
  const { data } = payload;
  try {
    const res = yield call(getAdsReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getAdsReportHomeDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetAdsPerformanceAction({ payload }) {
  const { data } = payload;
  try {
    const res = yield call(getAdsPerformanceApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getAdsPerformanceDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetReportAction({ payload }) {
  const { data, tiktok_account_id } = payload;
  console.log("vào sagaa watchGetReportAction ", tiktok_account_id);
  const query_params = {
    order_type: "DESC",
    page_size: 10,
    page: 1,
    advertiser_id: "7237386208756695041",
    type: "campaign_id",
    report_type: "BASIC",
    start_date: "2023-10-10",
    end_date: "2023-10-17",
    filtering: [],
    metrics: ["spend", "cpc", "cpm", "impressions", "clicks", "ctr", "conversion", "cost_per_conversion", "conversion_rate"]
  }

  const query_campaign = { ...query_params, type: "campaign_id" };
  const query_adgroup = { ...query_params, type: "adgroup_id" };
  const query_ads = { ...query_params, type: "ads_id" };
  try {
    const res_campaign = yield call(getReportApi, query_campaign, tiktok_account_id);
    const res_adgroup = yield call(getReportApi, query_adgroup, tiktok_account_id);
    const res_ads = yield call(getReportApi, query_ads, tiktok_account_id);
    if (res_campaign.data && !res_campaign.data.error && res_campaign.data.data) {
      console.log(res_campaign.data.data, "res_campaign watchGetReportAction");
      console.log(res_adgroup.data.data, "res_adgroup watchGetReportAction");
      console.log(res_ads.data.data, "res_ads watchGetReportAction");

      yield put(getReportDone({
        campaign : res_campaign.data.data.list,
        adgroup : res_adgroup.data.data.list,
        ads : res_ads.data.data.list,
      }));
    }
  } catch (error) {
    console.log(error?.response?.data ? error?.response?.data : error, "watchGetReportAction");
  }
}

export function* accountSaga() {
  yield takeEvery(GET_SHOP_LIST, watchGetListShopAction);
  yield takeEvery(GET_ADS_ACCOUNT_LIST, watchGetListAdsAccountAction);
  yield takeEvery(GET_GOI_SANPHAM, watchGoiSanPhamAction);
  yield takeEvery(GET_SHOP_REPORT_HOME, watchGetShopReportHomeAction);
  yield takeEvery(GET_ADS_REPORT_HOME, watchGetAdsReportHomeAction);
  yield takeEvery(GET_ADS_PERFORMANCE, watchGetAdsPerformanceAction);
  yield takeEvery(GET_REPORT, watchGetReportAction);
}

export default accountSaga;
