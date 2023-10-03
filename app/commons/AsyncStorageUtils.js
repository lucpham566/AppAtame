// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getItem(key) {
  return AsyncStorage.getItem(key)
    .then((data) => {
      //  logger.log(`[success] AsyncStorage.getItem(${key}) = `, data);
      return JSON.parse(data);
    })
    .catch((err) => {
      //  logger.log(`[error] AsyncStorage.getItem(${key}) = `, err);
      return null;
    });
}

export function setItem(key, val) {
  const value = JSON.stringify(val);
  return AsyncStorage.setItem(key, value)
    .then((data) => {
      //  logger.log(`[success] AsyncStorage.setItem(${key}, ${value}) = `, data);
      return data;
    })
    .catch((err) => {
      //  logger.log(`[error] AsyncStorage.setItem(${key}, ${value}) = `, err);
    });
}

export function clear() {
  return AsyncStorage.clear().then((err) => {
    if (err) {
      //  logger.log('[error] AsyncStorage.clear()', err);
    } else {
      //  logger.log('[success] AsyncStorage.clear()');
    }
  });
}
