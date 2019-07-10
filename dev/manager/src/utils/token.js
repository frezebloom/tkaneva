import store from "@/store";
import { AUTH_REFRESH } from "@/store/types/auth";

export default {
  checkTimeAccessToken() {
    const { expiresIn, user_id, refreshToken,  } = store.getters;

    if (expiresIn > Date.now()) return true
    store.dispatch(AUTH_REFRESH, { user_id, refreshToken } )
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
  }
}