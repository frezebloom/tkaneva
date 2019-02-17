<template>
  <div class="new-user">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать акаунт</div>
      <div class="form-wrapper">
        <label class="form-label">Имя</label>
        <input v-model="user.firstname" class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Фамилия</label>
        <input v-model="user.lastname" class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Логин</label>
        <input v-model="user.login" class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Почта</label>
        <input v-model="user.email" class="form-input" type="text">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Группа</label>
        <input v-model="user.group" class="form-input" type="select">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Пароль</label>
        <input v-model="user.password" class="form-input" type="password">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Повторите пароль</label>
        <input v-model="user.confrimPassword" class="form-input" type="password">
      </div>
      <div class="form-footer">
        <div @click="create" class="form-footer-wrapper">
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
import userService from "@/services/userService";
export default {
  name: "NewUser",
  components: {
    Button
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
  },
  methods: {
    create() {
      const response = userService.createUser(this.user);
      response
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>