import api from '@/services/api';
import token from '@/utils/token';

export default {
  async getUsers() {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).get(
      '/api/user/get'
    );
  },
  async createUser(user) {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).post(
      '/api/user/create',
      {
        user
      }
    );
  },
  async updateUser(user) {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).put(
      '/api/user/update',
      {
        user
      }
    );
  },
  async deleteUser(user) {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).post(
      '/api/user/delete',
      {
        user
      }
    );
  }
};
