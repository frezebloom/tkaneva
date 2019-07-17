import axios from "axios";
import store from "@/store";

export default () => {
  const { id, accessToken } = store.getters
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      id,
      accessToken
    }
  });
};
