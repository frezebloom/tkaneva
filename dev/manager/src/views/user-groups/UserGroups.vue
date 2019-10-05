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
      title: ["№", "Название", "Статус"],
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
  methods: {
    route(event) {
      const { userGroups, selectElements } = this;
      const selectUsers = this.getSelect(userGroups, selectElements);
      if (event !== "delete") {
        this.$router.push({
          name: event + " user group",
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
        const { userGroups, selectElements } = this;
        const selectUserGroups = this.getSelect(userGroups, selectElements);
        selectUserGroups.forEach(item => {
          const userGroups = userGroupService.deleteUser(item);
          userGroups
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
    },
    getSelect(userGroups, selectElements) {
      const select = userGroups.filter(userGroups => {
        if (selectElements.includes(userGroups.group_id)) {
          return userGroups;
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
</style>