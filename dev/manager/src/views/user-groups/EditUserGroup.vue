<template>
  <div class="edit-user">
    <Tabs :tabs="this.users" @eventClickTab="route($event)"/>
    <UserForm :state="user"/>
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import UserForm from "@/components/UserForm";

export default {
  name: "EditUserGroup",
  components: {
    Tabs,
    UserForm
  },
  data() {
    return {
      users: [],
      user: {}
    };
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

