<template>
  <div class="users">
    <div class="users-header">
      <h3>Пользователи</h3>
      <div class="users-header-btn-group">
        <div class="btn-add">+</div>
        <div class="btn-delete">-</div>
      </div>
    </div>
    <Table v-bind:data="users" v-bind:title="['№', 'Имя', 'Почта', 'Группа', 'Статус']"/>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
export default {
  name: "Users",
  components: {
    Table
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
  }
};
</script>
