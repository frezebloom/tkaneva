import api from "@/services/api";

export default {
  sendUserData(user) {
    return api().post("/api/user/create", {
      user
    });
  }
};
