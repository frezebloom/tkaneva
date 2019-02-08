<template>
  <div class="new-user">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать акаунт</div>
      <div class="form-wrapper">
        <label for="form-label">Имя</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label for="form-label">Фамилия</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label for="form-label">Почта</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label for="form-label">Группа</label>
        <input class="form-input" type="select">
      </div>
      <div class="form-wrapper">
        <label for="form-label">Статус</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label for="form-label">Пароль</label>
        <input class="form-input" type="password">
      </div>
      <div class="form-wrapper">
        <label for="form-label">Повторите пароль</label>
        <input class="form-input" type="password">
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "NewUser"
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>

