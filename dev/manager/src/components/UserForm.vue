<template>
  <div class="user-form">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать акаунт</div>
      <div class="form-wrapper">
        <label class="form-label">Имя *</label>
        <input
          :value="state.first_name"
          @input="inputHandler($event, 'first_name')"
          :class="[required.includes('first_name') ? 'form-input-error' : '', 'form-input']"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Фамилия *</label>
        <input
          :value="state.last_name"
          @input="inputHandler($event, 'last_name')"
          :class="[required.includes('last_name') ? 'form-input-error' : '', 'form-input']"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Логин *</label>
        <input
          :value="state.login"
          @input="inputHandler($event, 'login')"
          :class="[required.includes('login') ? 'form-input-error' : '', 'form-input']"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Почта *</label>
        <input
          :value="state.email"
          @input="inputHandler($event, 'email')"
          :class="[required.includes('email') ? 'form-input-error' : '', 'form-input']"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Группа *</label>
        <select class="form-select" @input="inputHandler($event, 'group_id')">
          <option
            v-for="(option, index) in userGroups"
            :key="index"
            :value="option.group_id"
            :selected="index === (state.group_id - 1) ? 'selected' : ''"
          >{{ option.name }}</option>
        </select>
      </div>
      <div class="form-wrapper">
        <label class="form-label">Пароль *</label>
        <input 
          @input="inputHandler($event, 'password')" 
          :class="[required.includes('password') ? 'form-input-error' : '', 'form-input']"
          type="password" />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Повторите пароль *</label>
        <input 
          @input="inputHandler($event, 'confrimPassword')" 
          :class="[required.includes('confrimPassword') ? 'form-input-error' : '', 'form-input']"
          type="password" />
      </div>
      <div class="form-footer">
        <div @click="saveChange" class="form-button">
          <Button value="Сохранить" styles="success" />
        </div>
        <div @click="$router.go(-1)" class="form-button">
          <Button value="Отмена" styles="default" />
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
    },
    userGroups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      user: {
        user_id: this.state.user_id || "",
        first_name: this.state.first_name || "",
        last_name: this.state.last_name || "",
        login: this.state.login || "",
        email: this.state.email || "",
        group_id: this.state.group_id || 1,
        password: "",
        confrimPassword: ""
      },
      required: [],
      noValid: [],
      passwordMatch: false

    };
  },
  computed: {

  },
  methods: {
    inputHandler(event, params) {
      this.user[params] = event.target.value;
    },
    validation() {
      function isEmpty(str) {
        return typeof str === "undefined" || str === null || str === "";
      }

      function validEmail(email) {
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
      }

      Object.keys(this.user).forEach(item => {
        if (isEmpty(this.user[item]) && item !== "user_id") {
          this.required.push(item);
        }
        if (item === "email") {
          if (!validEmail(this.user[item])) {
            this.noValid.push(item);
          }
        }
      });
    },
    saveChange() {
      this.validation();

      // if (!this.state.user_id) {
      //   const user = userService.createUser(this.user);
      //   user
      //     .then(response => {
      //       const user = response.data;
      //       this.$router.push({
      //         name: "users",
      //         params: { user }
      //       });
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
      // } else {
      //   const user = userService.updateUser(this.user);
      //   user
      //     .then(() => {
      //       this.$router.go(-1);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>