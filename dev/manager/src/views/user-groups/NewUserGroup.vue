<template>
  <div class="new-user">
    <UserForm :state="userGroup"/>
  </div>
</template>
<script>
import UserForm from "@/components/UserForm";

export default {
  name: "NewUserGroup",
  components: {
    UserForm
  },
  data() {
    return {
      userGroup: {
        name: "",
      }
    };
  }
};
</script>
