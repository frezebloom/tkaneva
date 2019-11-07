import services from '@/services/services';
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REFRESH
} from '../types/auth';

const state = {
  id: localStorage.getItem('id') || '',
  accessToken: localStorage.getItem('accessToken') || '',
  expiresIn: localStorage.getItem('expiresIn') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  status: 'unknown' //пока не исользуется
};

const getters = {
  isAuthenticated: state => !!state.accessToken,
  id: state => state.id,
  accessToken: state => state.accessToken,
  expiresIn: state => state.expiresIn,
  refreshToken: state => state.refreshToken,
  authStatus: state => state.status //пока не исользуется
};

const actions = {
  [AUTH_REQUEST]({ commit }, user) {
    return new Promise((resolve, reject) => {
      const response = services.fetchToken(
        '/api/auth/signup',
        user.login,
        user.password
      );

      commit(AUTH_REQUEST);

      response
        .then(response => {
          const { id, accessToken, expiresIn, refreshToken } = response.data;
          localStorage.setItem('id', id); // пока не используется, уйдёт в отдельный модуль
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('expiresIn', expiresIn);
          localStorage.setItem('refreshToken', refreshToken);

          commit(AUTH_SUCCESS, response.data);

          resolve(response.data);
        })
        .catch(error => {
          commit(AUTH_ERROR, error);
          localStorage.clear();
          reject(error);
        });
    });
  },
  [AUTH_LOGOUT]({ commit }) {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.clear();
      resolve();
    });
  },
  [AUTH_REFRESH]({ commit }, token) {
    return new Promise((resolve, reject) => {
      const response = services.refreshToken(
        '/api/auth/refresh-token',
        token.id,
        token.refreshToken
      );
      response
        .then(response => {
          const { id, accessToken, refreshToken, expiresIn } = response.data;
          localStorage.setItem('id', id); // пока не используется, уйдёт в отдельный модуль
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('expiresIn', expiresIn);
          localStorage.setItem('refreshToken', refreshToken);

          commit(AUTH_SUCCESS, response.data);
          resolve(response.data);
        })
        .catch(error => {
          commit(AUTH_ERROR, error);
          localStorage.clear();
          reject(error);
        });
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'; // пока не используется
  },
  [AUTH_SUCCESS]: (state, data) => {
    state.status = 'success'; // пока не используется
    state.id = data.id; // пока не используется, уйдёт в отдельный модуль
    state.accessToken = data.accessToken;
    state.expiresIn = data.expiresIn;
    state.refreshToken = data.refreshToken;
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'; // пока не используется
  },
  [AUTH_LOGOUT]: state => {
    state.accessToken = '';
    state.status = 'unknown'; // пока не используется
  },
  [AUTH_REFRESH]: (state, data) => {
    state.status = 'success'; // пока не используется
    state.id = data.id; // пока не используется, уйдёт в отдельный модуль
    state.accessToken = data.accessToken;
    state.expiresIn = data.expiresIn;
    state.refreshToken = data.refreshToken;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
