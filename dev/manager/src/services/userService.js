import api from '@/services/api';
import token from '@/utils/token';

export default {
  async getUsers() {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).get('/api/user/get');
  },
  async createUser(user) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post('/api/user/create', {
      user
    });
  },
  async updateUser(user) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).put('/api/user/update', {
      user
    });
  },
  async deleteUser(user) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post('/api/user/delete', {
      user
    });
  }
};
