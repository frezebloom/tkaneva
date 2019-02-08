<template>
  <div class="users">
    <Topbar title="Пользователи" v-on:clickEvent="handler($event)"/>
    <table>
      <th v-for="item in title" :key="item.id">{{item}}</th>

      <tr v-for="item in users" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.firstname}}</td>
        <td>{{item.lastname}}</td>
        <td>{{item.mail}}</td>
        <td>{{item.group}}</td>
        <td>{{item.status}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import Topbar from "@/components/Topbar.vue";
import router from "@/router.js";
export default {
  name: "Users",
  components: {
    Topbar
  },
  data: () => {
    return {
      title: ["№", "Имя", "Фамилия", "Почта", "Группа", "Статус"],
      users: [
        {
          id: "1",
          firstname: "Михаил",
          lastname: "Ярема",
          mail: "juxx@bk.ru",
          group: "admin",
          status: "Включено"
        },
        {
          id: "2",
          firstname: "Валерия",
          lastname: "Ярема",
          mail: "valera@bk.ru",
          group: "admin",
          status: "Включено"
        },
        {
          id: "3",
          firstname: "Бортик",
          lastname: "Снежана",
          mail: "bortic@bk.ru",
          group: "manager",
          status: "Включено"
        }
      ]
    };
  },
  methods: {
    handler: event => {
      router.push(`/users/${event}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/table.scss";
</style>

