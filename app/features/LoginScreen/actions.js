import * as types from './constants';
export const login = (data, callback) => {
  return {
    type: types.LOGIN,
    payload: {
      data,
      callback,
    },
  };
};

export const loginDone = (data, callback) => {
  return {
    type: types.LOGIN_DONE,
    payload: {
      data,
      callback,
    },
  };
};

export const getUserInfo = callback => {
  return {
    type: types.GET_USER_LOGIN,
    payload: {
      callback,
    },
  };
};

export const getUserInfoDone = data => {
  return {
    type: types.GET_USER_LOGIN_DONE,
    payload: {
      data,
    },
  };
};

export const logout = callback => {
  return {
    type: types.LOGOUT,
    payload: {
      callback,
    },
  };
};

export const logoutDone = data => {
  return {
    type: types.LOGOUT_DONE,
    payload: {
      data,
    },
  };
};

export const register = data => {
  return {
    type: types.REGISTER,
    payload: {
      data,
    },
  };
};

export const registerDone = data => {
  return {
    type: types.REGISTER_DONE,
    payload: {
      data,
    },
  };
};
