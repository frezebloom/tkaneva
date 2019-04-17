<template>
  <div class="users">
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
        v-for="item in users"
        :key="item.id"
      >
        <td>{{item.user_id}}</td>
        <td>{{item.first_name}}</td>
        <td>{{item.last_name}}</td>
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
import { table } from '@/mixins/table';

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
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/table.scss";
</style>