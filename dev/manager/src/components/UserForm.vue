<template>
  <div class="user-form">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать акаунт</div>
      <div class="form-wrapper">
        <label class="form-label">Имя</label>
        <input
          :value="state.first_name"
          @input="inputHandler($event, 'first_name')"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-wrapper">
        <label class="form-label">Фамилия</label>
        <input
          :value="state.last_name"
          @input="inputHandler($event, 'last_name')"
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
        <input @input="inputHandler($event, 'password')" class="form-input" type="password">
      </div>
      <div class="form-wrapper">
        <label class="form-label">Повторите пароль</label>
        <input @input="inputHandler($event, 'confrimPassword')" class="form-input" type="password">
      </div>
      <div class="form-footer">
        <div @click="saveChange" class="form-footer-wrapper">
          <Button value="Сохранить" styles="success"/>
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
        user_id: this.state.user_id || "",
        first_name: "",
        last_name: "",
        login: "",
        email: "",
        group: "",
        password: "",
        confrimPassword: ""
      }
    };
  },
  updated() {
    console.log(this.state.user_id);
  },
  methods: {
    inputHandler(event, params) {
      this.user[params] = event.target.value;
    },
    saveChange() {
      if (!this.state.user_id) {
        const user = userService.createUser(this.user);
        user
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const user = userService.updateUser(this.user);
        user
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>