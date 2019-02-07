<template>
  <div class="users">
    <Topbar title="Пользователи" v-on:clickEvent="handler($event)"/>
    <Table v-bind:data="users" v-bind:title="['№', 'Имя', 'Почта', 'Группа', 'Статус']"/>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
import Topbar from "@/components/Topbar.vue";
import router from "@/router.js";
export default {
  name: "Users",
  components: {
    Table,
    Topbar
  },
  data: () => {
    return {
      users: [
        {
          id: "1",
          name: "Михаил Ярема",
          mail: "juxx@bk.ru",
          group: "admin",
          status: "Включено"
        },
        {
          id: "2",
          name: "Валерия Ярема",
          mail: "valera@bk.ru",
          group: "admin",
          status: "Включено"
        },
        {
          id: "3",
          name: "Бортик Снежана",
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
