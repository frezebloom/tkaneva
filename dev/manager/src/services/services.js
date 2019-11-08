import api from '@/services/api';
import token from '@/utils/token';

export default {
  async get(path) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).get(path);
  },
  async create(path, payload) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post(path, {
      payload
    });
  },
  async update(path, payload) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).put(path, {
      payload
    });
  },
  async delete(path, payload) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post(path, {
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