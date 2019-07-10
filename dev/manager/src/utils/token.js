import store from "@/store";
import router from "@/router";
import { AUTH_REFRESH, AUTH_LOGOUT } from "@/store/types/auth";

export default {
  checkToken() {
    const { expiresIn, user_id, refreshToken  } = store.getters;

    if (expiresIn > Date.now()) return true

    store.dispatch(AUTH_REFRESH, { user_id, refreshToken } )
    .then(() => {
      return true;
    })
    .catch(() => {
      store.dispatch(AUTH_LOGOUT).then(() => {
        router.push("/login");
      });
    })
  }
}