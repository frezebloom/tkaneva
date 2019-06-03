<template>
  <div class="new-user-group">
    <UserGroupForm :state="userGroup"/>
  </div>
</template>
<script>
import UserGroupForm from "@/components/UserGroupForm";

export default {
  name: "NewUserGroup",
  components: {
    UserGroupForm
  },
  data() {
    return {
      userGroup: {
        name: ""
      }
    };
  }
};
</script>
