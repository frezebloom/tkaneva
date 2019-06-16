import api from "@/services/api";

export default {
  createUserGroup(userGroup) {
    return api().post("/api/user-group/create", {
      userGroup
    });
  }
};
