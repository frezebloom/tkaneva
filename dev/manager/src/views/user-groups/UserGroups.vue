<template>
  <div class="user-groups">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar 
      title="Группы пользователей" 
      @eventClickTopBar="route($event)"
      @eventHandlerSearch="eventSearch($event)"
      @eventClearSearch="clearSearch()"
    />
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="item in title" :key="item.id">{{item}}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.group_id)"
          :class="isActive(item.group_id)"
          v-for="item in filter"
          :key="item.group_id"
        >
          <td>{{item.group_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.status}}</td>
          <td>
            <input
              type="checkbox"
              :checked="checked(item.group_id)"
              @click.stop="select(item.group_id)"
            >
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

import userGroupService from "@/services/userGroupService";
import { table } from "@/mixins/table";
import { cornerDialog } from "@/mixins/cornerDialog";

export default {
  name: "UserGroups",
  mixins: [table, cornerDialog],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: ["№", "Название", "Статус", ""],
      hideCheck: false,
      checkHeader: "Удаление",
      checkQuestion: "Вы действительно хотите удалить?",
      userGroups: [],
      search: '',
      selectElements: []
    };
  },
  mounted() {
    const userGroups = userGroupService.getUserGroups();
    userGroups
      .then(userGroups => {
        this.userGroups = userGroups.data;
      })
      .catch(error => {
        console.log(error);
        this.showCornerDialog(
          "Ошибка",
          "Не удалось связаться с сервером. Обратитесь к администратору",
          "danger"
        );
      });
  },
  created() {
    const { status, title, message, button } = this.$route.params;
    if (status) {
      this.showCornerDialog(title, message, button);
    } else {
      this.hideCornerDialog = true;
    }
  },
  computed: {
    filter() {
      const foundItems = this.userGroups.filter(item => {

        let found = false;

        Object.keys(item).forEach(obj => {
          const string = String(item[obj]);
          const dataString = string.toLowerCase();
          if (dataString.includes(this.search)) found = true;
        });

        if (found) return item;

      });

      return foundItems;

    },
  },
  methods: {
    route(event) {
      const { userGroups, selectElements } = this;
      const selectUserGroups = this.getSelect(userGroups, selectElements);
      if (event === "delete") {
        if (selectUserGroups.length > 0) {
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
        if (selectUserGroups.length > 0) {
          this.$router.push({
            name: event + " user group",
            params: { selectUserGroups }
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
          name: event + " user group",
          params: { selectUserGroups }
        });
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { userGroups, selectElements } = this;
        const selectUserGroups = this.getSelect(userGroups, selectElements);
        selectUserGroups.forEach(item => {
          const userGroup = userService.deleteUser(item); //
          userGroup
            .then(() => {
              const userGroups = this.userGroups.filter(
                item => !selectUserGroups.includes(item)
              );
              this.userGroups = userGroups;
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
    getSelect(userGroups, selectElements) {
      return userGroups.filter(userGroup =>
        selectElements.includes(userGroup.group_id)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/table.scss";
@import "../../styles/cornerDialog.scss";
</style>