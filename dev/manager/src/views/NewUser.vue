<template>
  <div class="new-user">
    <UserForm/>
  </div>
</template>
<script>
import UserForm from "@/components/UserForm";

export default {
  name: "NewUser",
  components: {
    UserForm
  }
};
</script>
