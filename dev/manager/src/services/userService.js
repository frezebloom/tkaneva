import api from "@/services/api";

export default {
  createUser(user) {
    return api().post("/api/user/create", {
      user
    });
  },
  getUsers() {
    return api().get("/api/users/get");
  }
};
