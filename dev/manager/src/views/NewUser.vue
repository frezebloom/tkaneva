<template>
  <div class="new-user">
    <UserForm :state="user"/>
  </div>
</template>
<script>
import UserForm from "@/components/UserForm";

export default {
  name: "NewUser",
  components: {
    UserForm
  },
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        login: "",
        email: "",
        group: "",
        password: "",
        confrimPassword: ""
      }
    };
  }
};
</script>
