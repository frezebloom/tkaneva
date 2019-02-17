import api from "@/services/api";

export default {
  fetchToken(login, password) {
    return api().post("/api/auth/signup", {
      login,
      password
    });
  }
};
