<template>
  <div class="edit-user">
    <Tabs :tabs="this.users"/>
    <UserForm/>
  </div>
</template>
<script>
import Tabs from "@/components/Tabs";
import UserForm from "@/components/UserForm";

export default {
  name: "EditUser",
  components: {
    Tabs,
    UserForm
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    const { selectUsers } = this.$route.params;
    if (selectUsers) this.users = selectUsers;
  }
};
</script>

