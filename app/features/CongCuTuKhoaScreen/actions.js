import * as types from './constants';

export const searchKeyword = data => {
  return {
    type: types.SEARCH_KEYWORD,
    payload: {
      data,
    },
  };
};

export const searchKeywordDone = data => {
  return {
    type: types.SEARCH_KEYWORD_DONE,
    payload: {
      data,
    },
  };
};

export const getKeywordFiles = data => {
  return {
    type: types.GET_KEYWORD_FILES,
    payload: {
      data,
    },
  };
};

export const getKeywordFilesDone = data => {
  return {
    type: types.GET_KEYWORD_FILES_DONE,
    payload: {
      data,
    },
  };
};

export const getKeywordFileDetail = data => {
  return {
    type: types.GET_KEYWORD_FILE_DETAIL,
    payload: {
      data,
    },
  };
};

export const getKeywordFileDetailDone = data => {
  return {
    type: types.GET_KEYWORD_FILE_DETAIL_DONE,
    payload: {
      data,
    },
  };
};

export const createKeywordFileAction = (data, callback) => {
  return {
    type: types.CREATE_KEYWORD_FILE,
    payload: {
      data,
      callback,
    },
  };
};

export const createKeywordFileDone = data => {
  return {
    type: types.CREATE_KEYWORD_FILE_DONE,
    payload: {
      data,
    },
  };
};
