<template>
  <div class="user-form">
    <form v-on:submit.prevent class="form">
      <div class="form-header">{{title}}</div>
      <div class="form-wrapper">
        <label class="form-label">Имя *</label>
        <input
          v-model="user.first_name"
          @input="inputHandler($event, 'first_name')"
          :class="[errorInput.includes('first_name') ? 'form-input-error' : '', 'form-input']"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Фамилия *</label>
        <input
          v-model="state.last_name"
          @input="inputHandler($event, 'last_name')"
          :class="[errorInput.includes('last_name') ? 'form-input-error' : '', 'form-input']"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Логин *</label>
        <input
          v-model="state.login"
          @input="inputHandler($event, 'login')"
          :class="[errorInput.includes('login') ? 'form-input-error' : '', 'form-input']"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Почта *</label>
        <input
          v-model="state.email"
          @input="inputHandler($event, 'email')"
          :class="[errorInput.includes('email') ? 'form-input-error' : '', 'form-input']"
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
      <div v-if="!this.state.user_id">
        <div class="form-wrapper">
          <label class="form-label">Пароль *</label>
          <input
            @input="inputHandler($event, 'password')"
            v-model="state.password"
            :class="[errorInput.includes('password') ? 'form-input-error' : '', 'form-input']"
            type="password"
          />
         </div>
        <div class="form-wrapper">
          <label class="form-label">Повторите пароль *</label>
          <input
            @input="inputHandler($event, 'confrimPassword')"
            v-model="state.confrimPassword"
            :class="[errorInput.includes('confrimPassword') ? 'form-input-error' : '', 'form-input']"
            type="password"
          />
        </div>
      </div>
     
      <div class="form-footer">
        <div @click="check" class="form-button">
          <Button value="Сохранить" styles="success" />
        </div>
        <div @click="$router.go(-1)" class="form-button">
          <Button value="Отмена" styles="default" />
        </div>
      </div>
    </form>
    <div v-bind:class="[hideCornerDialog ? 'notActive-corner-dialog' : 'isActive-corner-dialog']">
      <CornerDialog
        @eventClickCornerDialog="dialogFromUser"
        :status="cornerDialogStatus"
        :message="cornerDialogMessage"
        :buttonStyle="cornerDialogBtnStyle"
      />
    </div>
  </div>
</template>
<script>
import userService from "@/services/userService";

import Button from "@/components/Button";
import CornerDialog from "@/components/CornerDialog";

import { cornerDialog } from "@/mixins/cornerDialog";
import { setTimeout } from "timers";

export default {
  name: "UserForm",
  mixins: [cornerDialog],
  components: {
    Button,
    CornerDialog
  },
  props: {
    title: {
      type: String,
      required: true
    },
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
        password: this.state.password || "",
        confrimPassword: this.state.password || ""
      },
      users: [],
      errorMessage: [],
      errorInput: []
    };
  },
  mounted() {
    const users = userService.getUsers();
    users
      .then(users => {
        this.users = users.data;
      })
      .catch(error => {
        console.error(error);
        this.showCornerDialog(
          "Ошибка",
          "Не удалось связаться с сервером. Обратитесь к администратору",
          "danger"
        );
      });
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
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
      }

      function matchCheck(users, email, login) {
        const matches = []
        users.forEach((item) => {
          if(item.email === email) matches.push('email')
          if(item.login === login) matches.push('login')
        })
        return matches
      }

      Object.keys(this.user).forEach(item => {
        if (isEmpty(this.user[item]) && item !== "user_id") {
          this.errorInput.push(item);
          this.errorMessage.push(
            "Поля отмеченные звездочкой обязательны для заполнения"
          );
        }
        if (item === "email") {
          if (!validEmail(this.user[item])) {
            this.errorInput.push(item);
            this.errorMessage.push("Введите корректный e-mail");
          }
        }
      });
      
      const matches = matchCheck(this.users, this.user.email, this.user.login);
      if(matches.length > 0) {
        matches.forEach((item) => {
          if(item === 'email') {
            this.errorInput.push(item);
            this.errorMessage.push("Указанный e-mail уже занят");
          }
          if(item === 'login') {
            this.errorInput.push(item);
            this.errorMessage.push("Указанный логин уже занят");
          }
        })
      }
      
      if(this.user.password !== this.user.confrimPassword) {
        this.errorInput.push('password', 'confrimPassword');
        this.errorMessage.push("Пароли не совпадают");
      }
    },
    check() {
      this.validation();
      if (this.errorMessage.length > 0) {
        this.showCornerDialog("Ошибка", this.errorMessage[0], "warning");
        this.errorMessage = [];
        setTimeout(() => {
          this.errorInput = [];
        }, 10000);
      } else {
        this.saveChange();
      }
    },
    saveChange() {
      if (!this.state.user_id) {
        const user = userService.createUser(this.user);
        user
          .then(response => {
            const user = response.data;
            this.$router.push({
              name: "users",
              params: { user }
            });
          })
          .catch(() => {
            this.showCornerDialog("Ошибка", 'Не удалось сохранить аккаунт', "warning");
          });
      } else {
        const user = userService.updateUser(this.user);
        user
          .then(() => {
            this.$router.go(-1);
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
@import "../styles/cornerDialog.scss";
</style>