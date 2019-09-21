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
import userGroupService from "@/services/userGroupService";

export default {
  name: "NewUserGroup",
  components: {
    UserGroupForm
  },
  data() {
    return {
      userGroup: {
        name: ""
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
