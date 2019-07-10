import store from "@/store";
import { AUTH_REFRESH } from "@/store/types/auth";

export default {
  checkTimeAccessToken() {
    const { expiresIn, refreshToken, user_id } = store.getters;

    if (expiresIn > Date.now()) return true
    store.dispatch(AUTH_REFRESH, { user_id, refreshToken })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
  }
}