import axios from "axios";
import store from "../store";

function checkTokenLifeTime(lifeTime) {
  const currentTime = new Date().getTime()
  return lifeTime < currentTime ? true : false
}

export default () => {
  // const { user_id, accessToken, refreshToken, accessTokenLife, refreshTokenLife } = store.getters;
  const { accessTokenLife, refreshTokenLife } = store.getters;
  if (checkTokenLifeTime(accessTokenLife)) {
    if (checkTokenLifeTime(refreshTokenLife)) {
      console.log('logout');
    } else {
      console.log('refresh token')
    }
  } else {
    console.log('I`am fine')
  }
  // console.log(checkTokenLifeTime(accessTokenLife))
  // console.log(checkTokenLifeTime(refreshTokenLife));

  return axios.create({
    baseURL: "http://localhost:3000"
  });
};
