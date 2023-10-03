import {call, put, takeEvery, delay} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  CREATE_KEYWORD_FILE,
  GET_KEYWORD_FILES,
  GET_KEYWORD_FILE_DETAIL,
  SEARCH_KEYWORD,
} from './constants';
import {
  createKeywordFileApi,
  getKeywordFileDetailApi,
  getKeywordFilesApi,
  searchKeywordApi,
  searchKeywordShopeeApi,
} from '../../apis/keyword';
import {
  getKeywordFileDetail,
  getKeywordFilesDone,
  searchKeywordDone,
} from './actions';
import {hideLoadingGlobal, showLoadingGlobal} from '../globalFeatures/actions';

function* watchSearchKeywordAction({payload}) {
  const {data} = payload;
  yield put(showLoadingGlobal());
  try {
    if (data.optionSearch === 'atosa') {
      const res = yield call(searchKeywordApi, data);
      if (res.data && !res.data.error && res.data.data) {
        yield put(searchKeywordDone(res.data.data.data.keywords));
      }
    } else {
      const res = yield call(searchKeywordShopeeApi, data);
      if (res.data && !res.data.error && res.data.data) {
        const dataFormat = res.data.data.map(i => {
          return {
            ...i,
            shopee_volume: i.search_volume,
            shopee_price: i.recommend_price,
          };
        });
        yield put(searchKeywordDone(dataFormat));
      }
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoadingGlobal());
}

function* watchGetKeywordFilesAction({payload}) {
  yield put(showLoadingGlobal());
  try {
    const res = yield call(getKeywordFilesApi);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getKeywordFilesDone(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoadingGlobal());
}

function* watchCreateKeywordFileAction({payload}) {
  const {data} = payload;

  yield put(showLoadingGlobal());
  try {
    const res = yield call(createKeywordFileApi, data);
    if (res.data && !res.data.error) {
      Toast.show({
        type: 'success',
        text1: 'Tạo file từ khóa thành công',
      });
      payload.callback?.callbackSuccess();
    }
  } catch (error) {
    console.log(error);
    const {data} = error.response;

    if (data && data.message) {
      Toast.show({
        type: 'error',
        text1: data.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Tạo file từ khóa thất bại',
      });
    }
  }
  yield put(hideLoadingGlobal());
}

function* watchGetKeywordFileDetailAction({payload}) {
  const {data} = payload;

  yield put(showLoadingGlobal());
  try {
    const res = yield call(getKeywordFileDetailApi, data);
    if (res.data && !res.data.error && res.data.data) {
      yield put(getKeywordFileDetail(res.data.data));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoadingGlobal());
}

export function* congCuTuKhoaSaga() {
  yield takeEvery(GET_KEYWORD_FILES, watchGetKeywordFilesAction);
  yield takeEvery(SEARCH_KEYWORD, watchSearchKeywordAction);
  yield takeEvery(CREATE_KEYWORD_FILE, watchCreateKeywordFileAction);
  yield takeEvery(GET_KEYWORD_FILE_DETAIL, watchGetKeywordFileDetailAction);
}

export default congCuTuKhoaSaga;
