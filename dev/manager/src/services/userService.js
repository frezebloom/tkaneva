import api from "@/services/api";
import token from "@/utils/token";
import store from "@/store";

export default {
  async getUsers() {
    const { id, accessToken } = store.getters
    const result = await token.checkToken()
    if (!result) { 
      console.log(accessToken)
      return api(id, accessToken).get("/api/user/get")
    } else {
      console.log(result.accessToken)
      return api(result.userId, result.accessToken).get("/api/user/get");
    }  
  },
  createUser(user) {
    
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
