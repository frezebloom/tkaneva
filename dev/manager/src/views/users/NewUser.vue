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
import services from "@/services/services";

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
    const users = services.get('/api/user/get');
    users
      .then(users => {
        this.users = users.data;
      })
      .catch(error => {
        console.error(error);
      });
    const userGroups = services.get('/api/user-group/get');
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
