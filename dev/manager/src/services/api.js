import axios from "axios";
import store from "../store";

export default () => {
  console.log(store);
  return axios.create({
    baseURL: "http://localhost:3000"
  });
};
