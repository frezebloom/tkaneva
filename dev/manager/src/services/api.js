import axios from "axios";

export default (id, accessToken) => {
  return axios.create({
    baseURL: "http://192.168.0.105:3000",
    headers: {
      id,
      accessToken
    }
  });
};
