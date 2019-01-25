<template>
  <div class="login-form">
    <div class="login-header"></div>
    <div class="login-form-wrapper">
      <div class="login-form-icon">
        <img alt="юзер" src="../assets/icons/user.svg">
      </div>
      <span class="header-search-icon">
        <input class="login-form-input" placeholder="Логин" autocomplete="off">
      </span>
    </div>
    <div class="login-form-wrapper">
      <div class="login-form-icon">
        <img alt="юзер" src="../assets/icons/key.svg">
      </div>
      <span>
        <input type="password" class="login-form-input" placeholder="Пароль" autocomplete="off">
      </span>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.login-form {
  position: absolute;
  top: 20%;
  right: 0;
  left: 0;
  margin: auto;
  overflow: auto;
  width: 30%;
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
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f9f6f1', endColorstr='#f2efea');
  border-bottom: 1px solid #d6d6d6;
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
  margin: 20px 20px 0 0;
}
.login-form-icon {
  border: 1px solid #d5d5d5;
  border-right: 0px;
  padding: 10px;
  margin: 20px 0px 0 20px;
}
img {
  height: 18px;
  width: 18px;
}
</style>
 

