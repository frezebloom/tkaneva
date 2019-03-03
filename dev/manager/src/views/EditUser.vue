<template>
  <div class="edit-user">
    <Tabs :tabs="this.users"/>
    <NewUser/>
  </div>
</template>
<script>
import Tabs from "@/components/Tabs";
import NewUser from "@/views/NewUser";

export default {
  name: "EditUser",
  components: {
    Tabs,
    NewUser
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

