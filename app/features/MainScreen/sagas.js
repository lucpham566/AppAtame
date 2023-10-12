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
  GET_SHOP_LIST,
  GET_SHOP_REPORT_HOME,
} from './constants';
import { getAdsAccountListApi, getGoiSanPhamApi, getShopListApi, getTiktokAccountListApi } from './../../apis/account';
import {
  getAdsAccountListDone,
  getAdsPerformanceDone,
  getAdsReportHomeDone,
  getGoiSanPhamDone,
  getShopListDone,
  getShopReportHomeDone,
} from './actions';
import { getShopReportApi } from '../../apis/tongQuan';
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

    console.log(res_tiktok.data, "res_tiktok.data tikotk");

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

export function* accountSaga() {
  yield takeEvery(GET_SHOP_LIST, watchGetListShopAction);
  yield takeEvery(GET_ADS_ACCOUNT_LIST, watchGetListAdsAccountAction);
  yield takeEvery(GET_GOI_SANPHAM, watchGoiSanPhamAction);
  yield takeEvery(GET_SHOP_REPORT_HOME, watchGetShopReportHomeAction);
  yield takeEvery(GET_ADS_REPORT_HOME, watchGetAdsReportHomeAction);
  yield takeEvery(GET_ADS_PERFORMANCE, watchGetAdsPerformanceAction);
}

export default accountSaga;
