import axios from "axios";

export default (id, accessToken) => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      id,
      accessToken
    }
  });
};
