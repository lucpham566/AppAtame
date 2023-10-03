import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import axiosService from '../commons/axiosService';

let token_store = null;

export const fetchToken = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem('access_token');
    axiosService.setToken(token);
  } catch (error) {
    console.log(error);
  }
  token_store = token;
};

export const setToken = token => {
  token_store = token;
};

export const getToken = () => {
  return token_store;
};
