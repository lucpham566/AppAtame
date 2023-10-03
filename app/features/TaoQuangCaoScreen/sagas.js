import {call, put, takeEvery, delay} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  hideLoadingGlobal,
  showLoadingGlobal,
} from './../globalFeatures/actions';

import {CREATE_SEARCH_ADS_BY_SUGGEST, GET_PRODUCT_LIST} from './constants';
import {
  createSearchAdsBySuggestApi,
  createSearchAdsTargetingApi,
  getProductListApi,
} from '../../apis/ads';
import {getProductListDone} from './actions';

function* watchGetProductListAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(getProductListApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getProductListDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoadingGlobal());
}

function* watchCreateSearchAdsBySuggestAction({payload}) {
  const {data, callback} = payload;
  yield put(showLoadingGlobal());
  try {
    if (data.campaignType === 'targeting') {
      const res = yield call(createSearchAdsTargetingApi, data);
      if (res.data && !res.data.error) {
        callback?.callbackSuccess();
        Toast.show({
          type: 'success',
          text1: 'Tạo quảng cáo thành công',
        });
      }
    } else {
      const res = yield call(createSearchAdsBySuggestApi, data);
      if (res.data && !res.data.error) {
        callback?.callbackSuccess();
        Toast.show({
          type: 'success',
          text1: 'Tạo quảng cáo thành công',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoadingGlobal());
}

export function* taoQuangCaoSaga() {
  yield takeEvery(GET_PRODUCT_LIST, watchGetProductListAction);
  yield takeEvery(
    CREATE_SEARCH_ADS_BY_SUGGEST,
    watchCreateSearchAdsBySuggestAction,
  );
}

export default taoQuangCaoSaga;
