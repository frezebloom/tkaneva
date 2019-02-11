<template>
  <div class="new-user">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать акаунт</div>
      <div class="form-wrapper">
        <label class="form-label">Имя</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Фамилия</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Почта</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Группа</label>
        <input class="form-input" type="select">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Статус</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Пароль</label>
        <input class="form-input" type="password">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Повторите пароль</label>
        <input class="form-input" type="password">
      </div>
      <div class="form-footer">
        <div class="form-footer-wrapper">
          <Button value="Создать" styles="success"/>
        </div>
        <div class="form-footer-wrapper">
          <Button value="Отмена" styles="default"/>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  name: "NewUser",
  components: {
    Button
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>

