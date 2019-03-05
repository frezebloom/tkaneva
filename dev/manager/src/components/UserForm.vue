<template>
  <div class="user-form">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать акаунт</div>
      <div class="form-wrapper">
        <label class="form-label">Имя</label>
        <input
          :value="state.firstname"
          @input="inputHandler($event, 'firstname')"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-wrapper">
        <label class="form-label">Фамилия</label>
        <input
          :value="state.lastname"
          @input="inputHandler($event, 'lastname')"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-wrapper">
        <label class="form-label">Логин</label>
        <input
          :value="state.login"
          @input="inputHandler($event, 'login')"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-wrapper">
        <label class="form-label">Почта</label>
        <input
          :value="state.email"
          @input="inputHandler($event, 'email')"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-wrapper">
        <label class="form-label">Группа</label>
        <input
          :value="state.group"
          @input="inputHandler($event, 'group')"
          class="form-input"
          type="select"
        >
      </div>
      <div class="form-wrapper">
        <label class="form-label">Пароль</label>
        <input
          :value="state.password"
          @input="inputHandler($event, 'password')"
          class="form-input"
          type="password"
        >
      </div>
      <div class="form-wrapper">
        <label class="form-label">Повторите пароль</label>
        <input
          :value="state.confrimPassword"
          @input="inputHandler($event, 'confrimPassword')"
          class="form-input"
          type="password"
        >
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
import Button from "@/components/Button";
import userService from "@/services/userService";
export default {
  name: "UserForm",
  components: {
    Button
  },
  props: {
    state: {
      type: Object,
      required: true
    }
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
    inputHandler(event, params) {
      this.user[params] = event.target.value;
    },
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