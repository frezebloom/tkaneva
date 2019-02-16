<template>
  <div class="users">
    <Topbar title="Пользователи" v-on:clickEvent="handler($event)"/>
    <table>
      <th v-for="item in title" :key="item.id">{{item}}</th>

      <tr v-for="item in users" :key="item.id">
        <td>{{item.user_id}}</td>
        <td>{{item.firstname}}</td>
        <td>{{item.lastname}}</td>
        <td>{{item.email}}</td>
        <td>{{item.group}}</td>
        <td>{{item.status}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import Topbar from "@/components/Topbar.vue";
import router from "@/router.js";
import userService from "@/services/userService";
export default {
  name: "Users",
  components: {
    Topbar
  },
  data() {
    return {
      title: ["№", "Имя", "Фамилия", "Почта", "Группа", "Статус"],
      users: []
    };
  },
  mounted() {
    const users = userService.getUsers();
    users
      .then(users => {
        this.users = users.data;
        console.log(users.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handler(event) {
      router.push(`/users/${event}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/table.scss";
</style>

