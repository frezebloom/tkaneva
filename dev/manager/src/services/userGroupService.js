import api from '@/services/api';
import token from '@/utils/token';

export default {
  getUserGroups() {
    const data = token.checkToken();
    return api(data.id, data.accessToken).get('/api/user-group/get');
  },
  createUserGroup(userGroup) {
    const data = token.checkToken();
    return api(data.id, data.accessToken).post('/api/user-group/create', {
      userGroup
    });
  },
  updateUserGroup(userGroup) {
    const data = token.checkToken();
    return api(data.id, data.accessToken).put('/api/user-group/update', {
      userGroup
    });
  },
  deleteUserGroup(userGroup) {
    const data = token.checkToken();
    return api(data.id, data.accessToken).post('/api/user-group/delete', {
      userGroup
    });
  }
};
