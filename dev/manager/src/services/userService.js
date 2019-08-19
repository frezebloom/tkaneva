import api from "@/services/api";
import token from "@/utils/token";


export default {
  async getUsers() {
    if (await token.checkToken()) return api().get("/api/user/get")
  },
  createUser(user) {
    token.checkToken();
    return api().post("/api/user/create", {
      user
    });
  },
  updateUser(user) {
    token.checkToken();
    return api().put("/api/user/update", {
      user
    });
  },
  deleteUser(user) {
    token.checkToken();
    return api().post("/api/user/delete", {
      user
    });
  }
};
