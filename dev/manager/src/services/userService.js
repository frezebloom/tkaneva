import api from '@/services/api';
import token from '@/utils/token';

export default {
  getUsers() {
    const data = token.checkToken();
    return api(data.id, data.accessToken).get('/api/user/get');
  },
  createUser(user) {
    const data = token.checkToken();
    return api(data.id, data.accessToken).post('/api/user/create', {
      user
    });
  },
  updateUser(user) {
    const data = token.checkToken();
    return api(data.id, data.accessToken).put('/api/user/update', {
      user
    });
  },
  deleteUser(user) {
    const data = token.checkToken();
    return api(data.id, data.accessToken).post('/api/user/delete', {
      user
    });
  }
};
