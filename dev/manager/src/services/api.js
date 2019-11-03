import axios from 'axios';

export default (id, accessToken) => {
  return axios.create({
    baseURL: 'http://194.58.98.72:3000',
    headers: {
      id,
      accessToken
    }
  });
};
