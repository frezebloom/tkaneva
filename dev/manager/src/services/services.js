import api from "@/services/api";

export default {
  get(path, token, data) {
    const payload = data ? data : undefined;
    return api(token.id, token.accessToken).get(path, {
      params: { payload: JSON.stringify(payload) }
    });
  },
  create(path, payload, token) {
    return api(token.id, token.accessToken).post(path, {
      payload
    });
  },
  update(path, payload, token) {
    return api(token.id, token.accessToken).put(path, {
      payload
    });
  },
  delete(path, payload, token) {
    return api(token.id, token.accessToken).post(path, {
      payload
    });
  },
  fetchToken(path, login, password) {
    return api().post(path, {
      login,
      password
    });
  },
  refreshToken(path, user_id, refresh_token) {
    return api().post(path, {
      user_id,
      refresh_token
    });
  }
};
