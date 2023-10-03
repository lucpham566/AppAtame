import {fetchToken, setToken} from '../../helpers/auth';
import * as types from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axiosService from '../../commons/axiosService';

const initialState = {
  access_token: '',
  userInfo: {},
};

const storeData = async value => {
  try {
    await AsyncStorage.setItem('access_token', value);
  } catch (e) {
    console.log(e);
  }
};

const setUserInfo = async data => {
  try {
    await AsyncStorage.setItem('userInfo', data);
  } catch (e) {
    console.log(e);
  }
};

const setAccountRemember = async data => {
  try {
    await AsyncStorage.setItem('accountRemember', data);
  } catch (e) {
    console.log(e);
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      const accountRemember = action.payload.data;
      setAccountRemember(JSON.stringify(accountRemember));

      return {
        ...state,
      };
    case types.LOGIN_DONE:
      let {data} = action.payload;
      storeData(data.token).then(() => {
        fetchToken();
        action.payload.callback?.callbackSuccess();
      });
      setUserInfo(JSON.stringify(data));
      axiosService.setToken(data.token);
      setToken(data.token);
      return {
        ...state,
        userInfo: data,
      };
    case types.LOGOUT:
      AsyncStorage.removeItem('access_token');
      AsyncStorage.removeItem('userInfo');
      let {callback} = action.payload;
      callback.callbackSuccess();
      Toast.show({
        type: 'success',
        text1: 'Đăng xuất thành công',
      });
      return {
        ...state,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default loginReducer;
