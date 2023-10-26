import {call, put, takeEvery, delay} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  hideLoadingGlobal,
  showLoadingGlobal,
} from './../globalFeatures/actions';

import {
  BAOCAO_GET_PRODUCT_ADS_LIST,
  GET_ADS_REPORT,
  UPDATE_ADS_QUOTA,
  UPDATE_ADS_STATE,
} from './constants';
import {getAdsReportApi} from '../../apis/ads';
import {getAdsReportDone, getProductAdsListDone} from './actions';
import {
  getProductAdsListApi,
  updateAdsQuota,
  updateAdsState,
} from '../../apis/tongQuan';

function* watchGetAdsReportAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(getAdsReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getAdsReportDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoadingGlobal());
}

function* watchGetProductAdsListAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
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
  yield put(hideLoadingGlobal());
}

function* watchUpdateAdsStateAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(updateAdsState, data);
    if (res.data && !res.data.error) {
      payload.callback?.callbackSuccess();
      Toast.show({
        type: 'success',
        text1: 'Cập nhật trạng thái thành công',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Cập nhật trạng thái thất bại',
    });
  }
  yield put(hideLoadingGlobal());
}

function* watchUpdateAdsQuotaAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(updateAdsQuota, data);
    if (res.data && !res.data.error) {
      payload.callback?.callbackSuccess();
      Toast.show({
        type: 'success',
        text1: 'Cập nhật ngân sách thành công',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Cập nhật ngân sách thất bại',
    });
  }
  yield put(hideLoadingGlobal());
}

export function* baoCaoSaga() {
  yield takeEvery(GET_ADS_REPORT, watchGetAdsReportAction);
  yield takeEvery(BAOCAO_GET_PRODUCT_ADS_LIST, watchGetProductAdsListAction);
  //yield takeEvery(UPDATE_ADS_STATE, watchUpdateAdsStateAction);
  yield takeEvery(UPDATE_ADS_QUOTA, watchUpdateAdsQuotaAction);
}

export default baoCaoSaga;
