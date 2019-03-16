import api from "@/services/api";

export default {
  getUsers() {
    return api().get("/api/users/get");
  },
  createUser(user) {
    return api().post("/api/user/create", {
      user
    });
  }
};
