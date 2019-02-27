import signupService from "@/services/signupService";

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../types/auth";

const state = {
  userId: localStorage.getItem("userId") || "",
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  status: "unknown" //пока не исользуется
};

const getters = {
  isAuthenticated: state => !!state.accessToken,
  authStatus: state => state.status //пока не исользуется
};

const actions = {
  [AUTH_REQUEST]({ commit }, user) {
    return new Promise((resolve, reject) => {
      const response = signupService.fetchToken(user.login, user.password);

      commit(AUTH_REQUEST);

      response
        .then(response => {
          const { userId, accessToken, refreshToken } = response.data;
          localStorage.setItem("userId", userId); // пока не используется, уйдёт в отдельный модуль
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          commit(AUTH_SUCCESS, response.data);

          resolve(response.data);
        })
        .catch(error => {
          commit(AUTH_ERROR, error);
          localStorage.clear();
          reject(error);
        });
    });
  },
  [AUTH_LOGOUT]({ commit }) {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.clear();
      resolve();
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading"; // пока не используется
  },
  [AUTH_SUCCESS]: (state, data) => {
    state.status = "success"; // пока не используется
    state.userId = data.userId; // пока не используется, уйдёт в отдельный модуль
    state.accessToken = data.accessToken;
    state.refreshToken = data.refreshToken;
  },
  [AUTH_ERROR]: state => {
    state.status = "error"; // пока не используется
  },
  [AUTH_LOGOUT]: state => {
    state.accessToken = "";
    state.status = "unknown"; // пока не используется
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
