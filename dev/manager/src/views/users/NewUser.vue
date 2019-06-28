<template>
  <div class="new-user">
    <UserForm :state="user" :userGroups="userGroups"/>
  </div>
</template>
<script>
import UserForm from "@/components/UserForm";

import userGroupService from "@/services/userGroupService";

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
        confrimPassword: ""
      },
      userGroups: []
    };
  },
  mounted() {
    const userGroups = userGroupService.getUserGroups();
    userGroups
      .then(userGroups => {
        this.userGroups = userGroups.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
