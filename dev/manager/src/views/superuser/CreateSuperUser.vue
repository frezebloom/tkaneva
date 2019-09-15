<template>
  <div @click="create" class="superuser">
    <Button value="Создать" />
  </div>
</template>
<script>
import Button from "@/components/Button.vue";

import userGroupService from "@/services/userGroupService";
import userService from "@/services/userService";

export default {
  name: "СreateSuperUser",
  components: {
    Button
  },
  data() {
    return {
      userGroup: {
        name: "admin"
      },
      user: {
        first_name: "superuser",
        last_name: "admin",
        login: "superuser",
        email: "juxx@bk.ru",
        group_id: 1,
        password: "111",
      }
    }
  },
  methods: {
    create() {
      this.createUserGroup()
      this.createSuperuser()
    },
    createUserGroup() {
      const userGroup = userGroupService.createUserGroup(this.userGroup);
      userGroup
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createSuperuser() {
      const user = userService.updateUser(this.user);
      user
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
