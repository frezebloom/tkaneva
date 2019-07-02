<template>
  <div class="users">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar title="Пользователи" @eventClickTopBar="route($event)" />
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
          />
        </td>
      </tr>
    </table>
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
import Topbar from "@/components/Topbar.vue";
import Check from "@/components/Check.vue";
import CornerDialog from "@/components/CornerDialog";

import userService from "@/services/userService";
import { table } from "@/mixins/table";
import { cornerDialog } from "@/mixins/cornerDialog";
import { setTimeout } from "timers";

export default {
  name: "Users",
  mixins: [table, cornerDialog],
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
      selectElements: []
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
  created() {
    const user = this.$route.params.user;
    if (user) {
      this.showCornerDialog("Успех", "Новый аккаунт успешно создан", "success");
    } else {
      this.hideCornerDialog = true;
    }
  },
  methods: {
    route(event) {
      const { users, selectElements } = this;
      const selectUsers = this.getSelect(users, selectElements);
      if (event === "delete") {
        if (selectUsers.length > 0) {
          this.hideCheck = !this.hideCheck;
        } else {
          this.showCornerDialog(
            "Ошибка",
            "Выберите хотя бы один элемент для удаления",
            "warning"
          );
        }
      }
      if (event === "edit") {
        if (selectUsers.length > 0) {
          this.$router.push({
            name: event + " user",
            params: { selectUsers }
          });
        } else {
          this.showCornerDialog(
            "Ошибка",
            "Выберите хотя бы один элемент для редактирования",
            "warning"
          );
        }
      }
      if (event === "new") {
        this.$router.push({
          name: event + " user",
          params: { selectUsers }
        });
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
              this.showCornerDialog(
                "Успех",
                "Операция удаления успешна завершена",
                "success"
              );
            })
            .catch(error => {
              this.showCornerDialog(
                "Ошибка",
                "Не удалось связаться с сервером. Обратитесь к администратору",
                "danger"
              );
              console.error(error);
            });
        });
      }
    },
    getSelect(users, selectElements) {
      const select = users.filter(user =>
        selectElements.includes(user.user_id)
      );
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