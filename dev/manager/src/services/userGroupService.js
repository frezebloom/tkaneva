import api from '@/services/api';
import token from '@/utils/token';

export default {
  async getUserGroups() {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).get('/api/user-group/get');
  },
  async createUserGroup(userGroup) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post('/api/user-group/create', {
      userGroup
    });
  },
  async updateUserGroup(userGroup) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).put('/api/user-group/update', {
      userGroup
    });
  },
  async deleteUserGroup(userGroup) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post('/api/user-group/delete', {
      userGroup
    });
  }
};
