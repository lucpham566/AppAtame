import * as types from './constants';

const initialState = {
  keywords: [],
  keywordFiles: [],
  keywordFileDetail: {},
};

const congCuTuKhoaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_KEYWORD_DONE:
      const keywords = [...action.payload.data];
      return {
        ...state,
        keywords,
      };
    case types.GET_KEYWORD_FILES_DONE:
      const keywordFiles = [...action.payload.data];
      return {
        ...state,
        keywordFiles,
      };
    case types.GET_KEYWORD_FILE_DETAIL:
      const keywordFileDetail = {...action.payload.data};
      return {
        ...state,
        keywordFileDetail,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default congCuTuKhoaReducer;
