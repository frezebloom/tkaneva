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
  status: "unknown"
};

const actions = {
  [AUTH_REQUEST]({ commit, dispatch }, user) {
    const response = signupService.fetchToken(user.login, user.password);

    commit(AUTH_REQUEST);

    response
      .then(response => {
        const { userId, accessToken, refreshToken } = response.data;
        localStorage.setItem("userId", userId);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        commit(AUTH_SUCCESS, response.data);
      })
      .catch(error => {
        commit(AUTH_ERROR, error);
        localStorage.clear();
      });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, data) => {
    state.userId = data.userId;
    state.accessToken = data.accessToken;
    state.refreshToken = data.refreshToken;
    state.status = "success";
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
  }
};

export default {
  state,
  actions,
  mutations
};
