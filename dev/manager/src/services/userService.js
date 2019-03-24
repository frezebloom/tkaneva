import api from "@/services/api";

export default {
  getUsers() {
    return api().get("/api/users/get");
  },
  createUser(user) {
    return api().post("/api/user/create", {
      user
    });
  },
  updateUser(user) {
    return api().put("/api/user/update", {
      user
    });
  },
  deleteUser(user) {
    return api().delete("/api/user/delete", {
      user
    });
  }
};
