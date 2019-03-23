<template>
  <div class="users">
    <Check/>
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
        <td>{{item.group}}</td>
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
  </div>
</template>
<script>
import Topbar from "@/components/Topbar.vue";
import Check from "@/components/Check.vue";
import userService from "@/services/userService";

export default {
  name: "Users",
  components: {
    Topbar,
    Check
  },
  data() {
    return {
      title: ["№", "Имя", "Фамилия", "Логин", "Почта", "Группа", "Статус"],
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
        console.log(error);
      });
  },
  methods: {
    route(event) {
      const { users, selectElements } = this;

      const selectUsers = this.getSelectUsers(users, selectElements);

      this.$router.push({
        name: event,
        params: { selectUsers }
      });
    },
    getSelectUsers(users, selectElements) {
      const selectUsers = users.filter(user => {
        if (selectElements.includes(user.user_id)) {
          return user;
        }
      });

      return selectUsers;
    },
    select(user_id) {
      const index = this.selectElements.indexOf(user_id);

      if (index !== -1) {
        this.selectElements.splice(index, 1);
      } else {
        this.selectElements.push(user_id);
      }
    },
    isActive(user_id) {
      const index = this.selectElements.indexOf(user_id);

      if (index !== -1) {
        return "isActive";
      } else {
        return "";
      }
    },
    checked(user_id) {
      const index = this.selectElements.indexOf(user_id);

      if (index !== -1) {
        return "checked";
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/table.scss";
</style>