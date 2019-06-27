<template>
  <div class="users">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar title="Пользователи" @eventClickTopBar="route($event)"/>
    <table>
      <th v-for="item in title" :key="item.id">{{item}}</th>
      <tr
        @click="select(item.user_id)"
        :class="isActive(item.user_id)"
        v-for="item in users"
        :key="item.id"
      >
        <td>{{item.user_id}}</td>
        <td>{{item.first_name}}</td>
        <td>{{item.last_name}}</td>
        <td>{{item.login}}</td>
        <td>{{item.email}}</td>
        <td>{{item.userGroup.name}}</td>
        <td>{{item.status}}</td>
        <td>
          <input
            type="checkbox"
            :checked="checked(item.user_id)"
            @click.stop="select(item.user_id)"
          >
        </td>
      </tr>
    </table>
    <div v-bind:class="[hideCornerDialog ? 'notActive-corner-dialog' : 'isActive-corner-dialog']">
      <CornerDialog
        @eventClickCornerDialog="dialogFromUser"
        :status="cornerDialogStatus"
        :message="cornerDialogMessage"
      />
    </div>
  </div>
</template>
<script>
import Topbar from "@/components/Topbar.vue";
import Check from "@/components/Check.vue";
import CornerDialog from "@/components/CornerDialog";

import userService from "@/services/userService";
import { table } from "@/mixins/table";
import { setTimeout } from "timers";

export default {
  name: "Users",
  mixins: [table],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: ["№", "Имя", "Фамилия", "Логин", "Почта", "Группа", "Статус"],
      hideCheck: false,
      checkHeader: "Удаление",
      checkQuestion: "Вы действительно хотите удалить?",
      users: [],
      selectElements: [],
      lastChange: null,
      hideCornerDialog: true,
      cornerDialogStatus: "",
      cornerDialogMessage: ""
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
          "Не удалось связаться с сервером. Обратитесь к администратору"
        );
      });
  },
  created() {
    const user = this.$route.params.user;
    if (user) {
      this.lastChange = user;
      this.showCornerDialog("Успех", "Новый аккаунт успешно создан");
    } else {
      this.lastChange = null;
      this.hideCornerDialog = true;
    }
  },
  methods: {
    route(event) {
      const { users, selectElements } = this;
      const selectUsers = this.getSelect(users, selectElements);
      if (event !== "delete") {
        this.$router.push({
          name: event + " user",
          params: { selectUsers }
        });
      } else {
        this.hideCheck = !this.hideCheck;
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { users, selectElements } = this;
        const selectUsers = this.getSelect(users, selectElements);
        selectUsers.forEach(item => {
          const user = userService.deleteUser(item);
          user
            .then(() => {
              const users = this.users.filter(
                item => !selectUsers.includes(item)
              );
              this.users = users;
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
    },
    dialogFromUser(event) {
      this.hideCornerDialog = event;
    },
    showCornerDialog(status, message) {
      this.cornerDialogStatus = status;
      this.cornerDialogMessage = message;
      setTimeout(() => {
        this.hideCornerDialog = false;
      }, 500);
      setTimeout(() => {
        this.hideCornerDialog = true;
      }, 10000);
    },
    getSelect(users, selectElements) {
      const select = users.filter(user => {
        if (selectElements.includes(user.user_id)) {
          return user;
        }
      });
      return select;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/table.scss";
@import "../../styles/cornerDialog.scss";
</style>