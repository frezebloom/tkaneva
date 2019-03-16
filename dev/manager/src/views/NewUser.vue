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
        first_name: "",
        last_name: "",
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
