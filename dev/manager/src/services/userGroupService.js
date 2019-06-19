import api from "@/services/api";

export default {
  getUserGroups() {
    return api().get("/api/user-group/get");
  },
  createUserGroup(userGroup) {
    return api().post("/api/user-group/create", {
      userGroup
    });
  }
};
