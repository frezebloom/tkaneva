import store from '@/store';
import router from '@/router';

import { AUTH_REFRESH, AUTH_LOGOUT } from '@/store/types/auth';

export default {
  checkToken() {
    const { id, accessToken, expiresIn, refreshToken } = store.getters;
    if (expiresIn > Date.now()) return { id, accessToken };
    return this.refreshToken(id, refreshToken);
  },
  refreshToken(id, refreshToken) {
    return store
      .dispatch(AUTH_REFRESH, { id, refreshToken })
      .then(data => {
        return data;
      })
      .catch(() => {
        store.dispatch(AUTH_LOGOUT).then(() => {
          router.push('/login');
        });
      });
  }
};
