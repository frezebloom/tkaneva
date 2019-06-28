<template>
  <div class="edit-user">
    <Tabs :tabs="this.users" @eventClickTab="route($event)"/>
    <UserForm :state="user" :userGroups="userGroups"/>
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
    }
  }
};
</script>
<style lang="scss" scoped>
// .edit-user {
//   max-width: 80%;
// }
</style>

