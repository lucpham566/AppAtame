import {HIDE_LOADING_GLOBAL, SHOW_LOADING_GLOBAL} from './constants';
const initialState = {
  globalLoading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING_GLOBAL: {
      return {
        ...state,
        globalLoading: true,
      };
    }

    case HIDE_LOADING_GLOBAL: {
      return {
        ...state,
        globalLoading: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default globalReducer;
