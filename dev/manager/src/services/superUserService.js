import api from '@/services/api';

export default {
  createSuperUser(user) {
    return api().post('/api/admin/user/create', {
      user
    });
  },
  createSuperUserGroup(userGroup) {
    return api().post('/api/admin/user-group/create', {
      userGroup
    });
  }
};
