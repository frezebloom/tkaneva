<template>
  <div class="user-groups">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar title="Группы пользователей" @eventClickTopBar="route($event)"/>
    <table>
      <th v-for="item in title" :key="item.id">{{item}}</th>

      <tr
        @click="select(item.user_id)"
        :class="isActive(item.user_id)"
        v-for="item in userGroups"
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
</template>
<script>
import Topbar from "@/components/Topbar.vue";
import Check from "@/components/Check.vue";
import userGroupService from "@/services/userGroupService";
import userService from "@/services/userService";
import { table } from "@/mixins/table";

export default {
  name: "UserGroups",
  mixins: [table],
  components: {
    Topbar,
    Check
  },
  data() {
    return {
      title: ["№", "Название", "Статус"],
      hideCheck: false,
      checkHeader: "Удаление",
      checkQuestion: "Вы действительно хотите удалить?",
      userGroups: [],
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
      });
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