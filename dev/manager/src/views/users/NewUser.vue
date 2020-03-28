<template>
  <div class="new-user">
    <UserForm title="Создать акаунт" :state="user" :users="users" :userGroups="userGroups" />
  </div>
</template>
<script>
import UserForm from "@/components/UserForm";
import services from "@/services/services";
import token from "@/utils/token";

export default {
  name: "NewUser",
  components: {
    UserForm
  },
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        login: "",
        email: "",
        group_id: "",
        password: "",
        confrimPassword: "",
        status: ""
      },
      users: [],
      userGroups: []
    };
  },
  mounted() {
    token
      .checkToken()
      .then(token => {
        services.get("/api/user/get", token).then(users => {
          this.users = users.data;
        });

        services.get("/api/user-group/get", token).then(userGroups => {
          this.userGroups = userGroups.data;
        });
      })
      .catch(error => {
        console.log(`NewUser-1  ${error}`);
      });
  }
};
</script>
