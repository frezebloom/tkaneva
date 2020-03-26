<template>
  <div class="users">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar
      title="Пользователи"
      @eventClickTopBar="route($event)"
      @eventHandlerSearch="eventSearch($event)"
      @eventClearSearch="clearSearch()"
    />
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="item in title" :key="item.user_id">{{item}}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.user_id)"
          :class="isActive(item.user_id)"
          v-for="item in filter"
          :key="item.user_id"
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
    </div>

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

import services from "@/services/services";
import token from "@/utils/token";
import { table } from "@/mixins/table";
import { cornerDialog } from "@/mixins/cornerDialog";

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
      title: ["№", "Имя", "Фамилия", "Логин", "Почта", "Группа", "Статус", ""],
      users: []
    };
  },
  mounted() {
    token
      .checkToken()
      .then(token => {
        services
          .get("/api/user/get", token)
          .then(users => {
            this.users = users.data;
          })
          .catch(error => {
            console.log(`Users-1  ${error}`);
            this.showCornerDialog(
              "Ошибка",
              "Не удалось связаться с сервером. Обратитесь к администратору",
              "danger"
            );
          });
      })
      .catch(error => {
        console.log(`Users-2  ${error}`);
        this.showCornerDialog(
          "Ошибка",
          "Не удалось связаться с сервером. Обратитесь к администратору",
          "danger"
        );
      });
  },
  computed: {
    filter() {
      const foundItems = this.users.filter(item => {
        let found = false;

        Object.keys(item).forEach(obj => {
          const string = String(item[obj]);
          const dataString = string.toLowerCase();
          if (dataString.includes(this.search)) found = true;
        });

        if (found) return item;
      });

      return foundItems;
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
        const selectUsers = this.getSelect(users, selectElements).map(
          item => item.user_id
        );
        token
          .checkToken()
          .then(token => {
            services
              .delete("/api/user/delete", selectUsers, token)
              .then(() => {
                this.users = this.users.filter(
                  item => !selectUsers.includes(item.user_id)
                );
                this.showCornerDialog(
                  "Успех",
                  "Операция удаления успешна завершена",
                  "success"
                );
              })
              .catch(error => {
                console.log(`Users-3  ${error}`);
                this.showCornerDialog(
                  "Ошибка",
                  "Не удалось связаться с сервером. Обратитесь к администратору",
                  "danger"
                );
              });
          })
          .catch(error => {
            console.log(`Users-4  ${error}`);
            this.showCornerDialog(
              "Ошибка",
              "Не удалось связаться с сервером. Обратитесь к администратору",
              "danger"
            );
          });
      }
    },
    getSelect(users, selectElements) {
      return users.filter(user => selectElements.includes(user.user_id));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/table.scss";
@import "../../styles/cornerDialog.scss";
</style>