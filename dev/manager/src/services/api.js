import axios from 'axios';

export default (id, accessToken) => {
  return axios.create({
    baseURL: 'http://192.168.0.101:3000',
    headers: {
      id,
      accessToken
    }
  });
};
