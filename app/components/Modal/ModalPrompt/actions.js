import * as types from './constants';

export const showModalPrompt = (data, callback) => {
  return {
    type: types.SHOW_MODAL_PROMPT,
    payload: {
      data,
      callback,
    },
  };
};

export const hideModalPrompt = data => {
  return {
    type: types.HIDE_MODAL_PROMPT,
    payload: {
      data,
    },
  };
};
