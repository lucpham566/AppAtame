import {call, put, takeEvery, delay} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  hideLoadingGlobal,
  showLoadingGlobal,
} from './../globalFeatures/actions';
import {GET_USER_LOGIN, LOGIN} from './constants';
import {getUserInfoApi, loginApi} from '../../apis/auth';
import {loginDone} from './actions';
import {getShopList, getGoiSanPham} from './../MainScreen/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* watchLoginAction({payload}) {
  let data = {
    username: payload.data.username,
    password: payload.data.password,
  };
  try {
    const res = yield call(loginApi, data);
    if (res.data && res.data.data.token) {
      yield put(loginDone(res.data.data, payload.callback));
    }
  } catch (error) {
    console.log(error);
    yield put(hideLoadingGlobal());
    if (
      error.response?.data?.message ===
      'Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra và thử lại sau!'
    ) {
      Toast.show({
        type: 'error',
        text1: 'Tài khoản hoặc mật khẩu không đúng',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Lỗi đăng nhập',
      });
    }
  }
}

function* watchGetUserInfoAction({payload}) {
  try {
    const res = yield call(getUserInfoApi);
    if (res.data) {
      payload.callback.callbackSuccess();
      const currentShopId = yield AsyncStorage.getItem('currentShopId');
      yield put(getShopList(currentShopId));
      yield put(getGoiSanPham());
    } else {
      payload.callback.callbackError();
    }
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      payload.callback.callbackError();
    } else {
      payload.callback.callbackError();
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
      });
    }
  }
}

export function* authSaga() {
  yield takeEvery(LOGIN, watchLoginAction);
  yield takeEvery(GET_USER_LOGIN, watchGetUserInfoAction);
}

export default authSaga;
