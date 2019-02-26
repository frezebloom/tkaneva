import signupService from "@/services/signupService";

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../types/auth";

const state = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  userId: localStorage.getItem("userId") || "",
  status: ""
};

const actions = {
  [AUTH_REQUEST]({ commit, dispatch }, user) {
    const response = signupService.fetchToken(user.login, user.password);
    response.then(response => {
      console.log(response);
      // const { access_token, refresh_token, user_id } = response.data;
      // console.log(response.data);
      // localStorage.setItem("accessToken", access_token);
      // localStorage.setItem("refreshToken", refresh_token);
      // localStorage.setItem("userId", user_id);
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  }
};

export default {
  state,
  actions,
  mutations
};
