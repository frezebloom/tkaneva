import api from '@/services/api';

export default {
  createSuperUser(user) {
    return api().post('/api/superuser/user/create', {
      user
    });
  },
  createSuperUserGroup(userGroup) {
    return api().post('/api/superuser/user-group/create', {
      userGroup
    });
  }
};
