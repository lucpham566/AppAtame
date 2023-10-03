import {call, put, takeEvery, delay} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  hideLoadingGlobal,
  showLoadingGlobal,
} from './../globalFeatures/actions';
import { GET_PRODUCT_ADS_LIST, GET_SHOP_REPORT, GET_SHOP_REPORT_COMPARE } from './constants';
import {getProductAdsListApi, getShopReportApi} from '../../apis/tongQuan';
import {getProductAdsListDone, getShopReportCompareDone, getShopReportDone} from './actions';

function* watchGetShopReportAction({payload}) {
  const {data} = payload;
  try {
    const res = yield call(getShopReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getShopReportDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}


function* watchGetShopReportCompareAction({payload}) {
  const {data} = payload;
  try {
    const res = yield call(getShopReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getShopReportCompareDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetProductAdsListAction({payload}) {
  const {data} = payload;
  try {
    const res = yield call(getProductAdsListApi, data);
    if (res.data && !res.data.error && res.data.data) {
      if (res.data.data.campaign_ads_list) {
        yield put(getProductAdsListDone(res.data.data.campaign_ads_list));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function* tongQuanSaga() {
  yield takeEvery(GET_SHOP_REPORT, watchGetShopReportAction);
  yield takeEvery(GET_SHOP_REPORT_COMPARE, watchGetShopReportCompareAction);
  yield takeEvery(GET_PRODUCT_ADS_LIST, watchGetProductAdsListAction);
}

export default tongQuanSaga;
