<template>
  <div class="login-form">
    <div class="login-header">Вход</div>
    <div class="login-form-wrapper">
      <div class="login-form-icon">
        <img alt="login" src="../assets/icons/user.svg">
      </div>
      <span class="header-search-icon">
        <input v-model="login" class="login-form-input" placeholder="Логин" autocomplete="off">
      </span>
    </div>
    <div class="login-form-wrapper">
      <div class="login-form-icon">
        <img alt="password" src="../assets/icons/key.svg">
      </div>
      <span>
        <input
          v-model="password"
          type="password"
          class="login-form-input"
          placeholder="Пароль"
          autocomplete="off"
        >
      </span>
    </div>
    <div class="login-footer">
      <div v-on:click="signup">
        <Button value="Войти" styles="success"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

import { AUTH_REQUEST } from "@/store/types/auth";
export default {
  name: "Login",
  components: {
    Button
  },
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    signup() {
      const { login, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { login, password });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.login-form {
  max-width: 400px;
  margin: 0 auto;
  overflow: auto;
  background-color: #f9f9f9;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  border-bottom: 2px solid #d5d5d5;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.login-header {
  position: relative;
  height: 40px;
  line-height: 40px;
  background: #f9f6f1;
  color: gray;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f9f6f1', endColorstr='#f2efea');
  border-bottom: 1px solid #d6d6d6;
  font-size: 14px;
  padding: 10px 0 10px 30px;
  font-weight: 800;
  color: #525252;
  line-height: 18px;
}
.login-form-wrapper {
  display: flex;
}
.login-form-input {
  outline: none;
  border: 0;
  min-width: 300px;
  border: 1px solid #d5d5d5;
  height: 44px;
  padding: 10px;
  margin: 20px 0 0 0;
}
.login-form-icon {
  border: 1px solid #d5d5d5;
  border-right: 0px;
  padding: 10px;
  margin: 20px 0 0 30px;
}
img {
  height: 18px;
  width: 18px;
}
.login-footer {
  display: flex;
  flex-direction: row-reverse;
  margin: 30px 20px 30px 0px;
}
</style>
 

