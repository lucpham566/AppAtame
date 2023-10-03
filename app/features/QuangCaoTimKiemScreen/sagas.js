import {call, put, takeEvery, delay} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  hideLoadingGlobal,
  showLoadingGlobal,
} from './../globalFeatures/actions';

import {
  BAOCAO_GET_PRODUCT_ADS_LIST,
  GET_ADS_REPORT,
  UPDATE_ADS_STATE,
} from './constants';
import {getAdsReportApi} from '../../apis/ads';
import {getAdsReportDone, getProductAdsListDone} from './actions';
import {getProductAdsListApi, updateAdsState} from '../../apis/tongQuan';

function* watchGetAdsReportAction({payload}) {
  const {data} = payload;
  try {
    const res = yield call(getAdsReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getAdsReportDone(res.data.data));
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

function* watchUpdateAdsStateAction({payload}) {
  const {data} = payload;
  try {
    const res = yield call(updateAdsState, data);

    if (res.data && !res.data.error) {
      payload.callback?.callbackSuccess();
    }
  } catch (error) {
    console.log(error);
  }
}

export function* quangCaoTimKiemSaga() {
  yield takeEvery(GET_ADS_REPORT, watchGetAdsReportAction);
  yield takeEvery(BAOCAO_GET_PRODUCT_ADS_LIST, watchGetProductAdsListAction);
  yield takeEvery(UPDATE_ADS_STATE, watchUpdateAdsStateAction);
}

export default quangCaoTimKiemSaga;
