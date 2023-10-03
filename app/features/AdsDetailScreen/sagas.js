import {call, put, takeEvery, delay} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  hideLoadingGlobal,
  showLoadingGlobal,
} from './../globalFeatures/actions';
import {
  ADD_KEYWORD_ADS,
  GET_ADS_DETAIL,
  GET_CAMPAIGN_REPORT,
  GET_CAMPAIGN_REPORT_COMPARE,
  UPDATE_ADS_BASE_PRICE,
  UPDATE_ADS_PREMIUM_RATE,
  UPDATE_KEYWORD_STATE,
} from './constants';
import {
  addKeywordAdsDone,
  getAdsDetailDone,
  getCampaignReportCompareDone,
  getCampaignReportDone,
  updateKeywordStateDone,
  updatePremiumRateDone,
} from './actions';
import {
  getAdsDetailApi,
  getCampaignReportApi,
  updateAdsBasePriceApi,
  updateAdsPremiumRateApi,
  updateKeywordState,
} from '../../apis/ads';

function* watchGetAdsDetailAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(getAdsDetailApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getAdsDetailDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoadingGlobal());
}

function* watchGetCampaignReportAction({payload}) {
  const {data} = payload;
  try {
    const res = yield call(getCampaignReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getCampaignReportDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetCampaignReportCompareAction({payload}) {
  const {data} = payload;
  try {
    const res = yield call(getCampaignReportApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getCampaignReportCompareDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchUpdateKeywordStateAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(updateKeywordState, data);
    if (res.data && !res.data.error) {
      // payload.callback?.callbackSuccess();
      yield put(updateKeywordStateDone(data));
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

function* watchAddKeywordAdsAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(updateKeywordState, data);
    if (res.data && !res.data.error) {
      payload.callback?.callbackSuccess();
      yield put(addKeywordAdsDone(data));
      Toast.show({
        type: 'success',
        text1: 'Thêm từ khóa thành công',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Thêm từ khóa thất bại',
    });
  }
  yield put(hideLoadingGlobal());
}

function* watchUpdatePremiumRateAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(updateAdsPremiumRateApi, data);
    console.log(res.data, 'dầdsaf');
    if (res.data && !res.data.error) {
      payload.callback?.callbackSuccess();
      yield put(updatePremiumRateDone(data));

      Toast.show({
        type: 'success',
        text1: 'Chỉnh sửa premium thành công',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Chỉnh sửa premium thất bại',
    });
  }
  yield put(hideLoadingGlobal());
}

function* watchUpdateBasePriceAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    const res = yield call(updateAdsBasePriceApi, data);
    if (res.data && !res.data.error) {
      payload.callback?.callbackSuccess();
      Toast.show({
        type: 'success',
        text1: 'Chỉnh sửa giá thầu thành công',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Chỉnh sửa giá thầu thất bại',
    });
  }
  yield put(hideLoadingGlobal());
}

export function* adsDetailSaga() {
  yield takeEvery(GET_ADS_DETAIL, watchGetAdsDetailAction);
  yield takeEvery(
    GET_CAMPAIGN_REPORT_COMPARE,
    watchGetCampaignReportCompareAction,
  );
  yield takeEvery(GET_CAMPAIGN_REPORT, watchGetCampaignReportAction);
  yield takeEvery(UPDATE_KEYWORD_STATE, watchUpdateKeywordStateAction);
  yield takeEvery(ADD_KEYWORD_ADS, watchAddKeywordAdsAction);
  yield takeEvery(UPDATE_ADS_PREMIUM_RATE, watchUpdatePremiumRateAction);
  yield takeEvery(UPDATE_ADS_BASE_PRICE, watchUpdateBasePriceAction);
}

export default adsDetailSaga;
