import axios from "axios";
import store from "../store";

export default () => {
  const { user_id, accessToken, refreshToken } = store.getters
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: { user_id, accessToken, refreshToken }
  });
};
