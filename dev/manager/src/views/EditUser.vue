<template>
  <div class="edit-user"></div>
</template>
<script>
export default {
  name: "EditUser",
  props: {
    selectUsers: {
      type: Array,
      required: false
    }
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

