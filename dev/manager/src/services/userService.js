import api from "@/services/api";
import token from "@/utils/token";


export default {
  getUsers() {
    console.log(token.checkToken());
    return api().get("/api/user/get");
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
    return api().post("/api/user/delete", {
      user
    });
  }
};
