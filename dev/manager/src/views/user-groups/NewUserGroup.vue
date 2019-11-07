<template>
  <div class="new-user-group">
    <UserGroupForm 
      title="Создать группу пользователей" 
      :state="userGroup"
      :userGroups="userGroups"
    />
  </div>
</template>
<script>
import UserGroupForm from "@/components/UserGroupForm";
import services from "@/services/services";

export default {
  name: "NewUserGroup",
  components: {
    UserGroupForm
  },
  data() {
    return {
      userGroup: {
        name: "",
        status: ""
      },
      userGroups: [] 
    };
  },
  mounted() {
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
