import * as types from './constants';

const initialState = {
  showModalPrompt: false,
  title: '',
  text: '',
  description: '',
  callbackSuccess: () => {},
  callbackError: () => {},
};

const modalPromptReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL_PROMPT:
      const {title, text, description} = action.payload.data;
      const {callbackSuccess, callbackError} = action.payload.callback;
      return {
        ...state,
        showModalPrompt: true,
        title,
        text,
        description,
        callbackSuccess,
        callbackError,
      };
    case types.HIDE_MODAL_PROMPT:
      return {
        ...state,
        showModalPrompt: false,
        title: '',
        text: '',
        description: '',
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default modalPromptReducer;
