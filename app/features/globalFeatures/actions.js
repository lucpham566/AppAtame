import {SHOW_LOADING_GLOBAL, HIDE_LOADING_GLOBAL} from './constants';

export const showLoadingGlobal = data => {
  return {
    type: SHOW_LOADING_GLOBAL,
    data,
  };
};
export const hideLoadingGlobal = data => {
  return {
    type: HIDE_LOADING_GLOBAL,
    data,
  };
};
