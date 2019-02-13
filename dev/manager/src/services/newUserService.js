import api from "@/services/api";

export default {
  sendUserData(user) {
    return api().post("/api/auth/signups", {
      body: JSON.stringify(user)
    });
  }
};
