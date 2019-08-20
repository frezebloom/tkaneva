import store from "@/store";
import router from "@/router";
import { AUTH_REFRESH, AUTH_LOGOUT } from "@/store/types/auth";
const { expiresIn, id, refreshToken } = store.getters;

export default {
  checkToken() {
    if (expiresIn > Date.now()) return false
    const data = this.refreshToken()
    return data;
  },
  refreshToken() {
    return store.dispatch(AUTH_REFRESH, { id, refreshToken })
    .then((data) => {
      return data;
    })
    .catch(() => {
      store.dispatch(AUTH_LOGOUT).then(() => {
        router.push("/login");
      });
    })
  }
}