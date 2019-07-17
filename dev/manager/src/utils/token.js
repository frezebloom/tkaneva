import store from "@/store";
import router from "@/router";
import { AUTH_REFRESH, AUTH_LOGOUT } from "@/store/types/auth";

export default {
  checkToken() {
    const { expiresIn, id, refreshToken  } = store.getters;
    if (expiresIn > Date.now()) return true

    store.dispatch(AUTH_REFRESH, { id, refreshToken } )
    .then((data) => {
      console.log(data);
      return true;
    })
    .catch(() => {
      store.dispatch(AUTH_LOGOUT).then(() => {
        router.push("/login");
      });
    })
  }
}