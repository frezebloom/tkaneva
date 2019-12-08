import axios from "axios";

export default (id, accessToken) => {
  return axios.create({
    baseURL: `http://${window.location.hostname}:3000`,
    headers: {
      id,
      accessToken
    }
  });
};
