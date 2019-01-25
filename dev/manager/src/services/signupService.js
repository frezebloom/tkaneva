import api from "@/services/api";

export default {
  fetchToken() {
    return api().post("api/signup");
  }
};
