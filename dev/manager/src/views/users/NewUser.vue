<template>
  <div class="new-user">
    <UserForm 
      title="Создать акаунт" 
      :state="user"  
      :users="users"
      :userGroups="userGroups"
    />
  </div>
</template>
<script>
import UserForm from "@/components/UserForm";
import userService from "@/services/userService";
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
        confrimPassword: "",
        status: ""
      },
      users: [],
      userGroups: []
    };
  },
  mounted() {
    const users = userService.getUsers();
    users
      .then(users => {
        this.users = users.data;
      })
      .catch(error => {
        console.error(error);
      });
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
