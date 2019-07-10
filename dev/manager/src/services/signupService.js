import api from "@/services/api";

export default {
  fetchToken(login, password) {
    return api().post("/api/auth/signup", {
      login,
      password
    });
  },
  refreshToken(user_id, refresh_token) {
    return api().post("/api/auth/refreshToken", {
      user_id,
      refresh_token
    })
  }
};
