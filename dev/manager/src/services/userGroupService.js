import api from '@/services/api';
import token from '@/utils/token';

export default {
  async getUserGroups() {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).get(
      '/api/user-group/get'
    );
  },
  async createUserGroup(userGroup) {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).post(
      '/api/user-group/create',
      {
        userGroup
      }
    );
  },
  async updateUserGroup(userGroup) {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).put(
      '/api/user-group/update',
      {
        userGroup
      }
    );
  },
  async deleteUserGroup(userGroup) {
    const result = await token.checkToken();
    return api(result.id || result.userId, result.accessToken).post(
      '/api/user-group/delete',
      {
        userGroup
      }
    );
  }
};
