<template>
  <header class="header">
    <div class="header-logo">System Manager</div>
    <div class="header-logout">
      <img alt="Выйти" @click="logout" src="../assets/icons/logout.svg">
    </div>
  </header>
</template>
<script>
import { AUTH_LOGOUT } from "@/store/types/auth";

export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $colorBlue;
  max-height: 100px;
}
.header-logo {
  color: $colorWhite;
  background-color: #367fa9;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  text-align: center;
  width: 230px;
}
.header-logout img {
  max-height: 30px;
  margin-right: 25px;
  opacity: 1;
  cursor: pointer;
}
.header-logout img:hover {
  opacity: 0.8;
}
</style>

