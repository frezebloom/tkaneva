<template>
  <div class="edit-user">
    <div v-if="this.users.length > 1">
      <Tabs :tabs="this.users" @eventClickTab="route($event)" @eventClickCloseTab="closeTab($event)" />
    </div>
    <UserForm title="Редактировать акаунт" :state="user" :userGroups="userGroups"/>
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import UserForm from "@/components/UserForm";

import userGroupService from "@/services/userGroupService";

export default {
  name: "EditUser",
  components: {
    Tabs,
    UserForm
  },
  data() {
    return {
      users: [],
      user: {},
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
  },
  created() {
    const { selectUsers } = this.$route.params;
    if (selectUsers) {
      this.users = selectUsers;
      this.user = selectUsers[0];
    }
  },
  methods: {
    route(index) {
      this.user = this.users[index];
    },
    closeTab(element) {
      this.users = this.users.filter((item, index) => {
        if(index !== element) return item
      })
      this.user = this.users[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-user {
  width: 100%;
}
</style>

