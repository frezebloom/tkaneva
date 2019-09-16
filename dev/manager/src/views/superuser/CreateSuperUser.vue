<template>
  <div @click="create" class="superuser">
    <Button value="Создать" />
  </div>
</template>
<script>
import Button from "@/components/Button.vue";

import superUserService from "@/services/superUserService";

export default {
  name: "СreateSuperUser",
  components: {
    Button
  },
  data() {
    return {
      userGroup: {
        name: "admin",
        status: "Вкл"
      },
      user: {
        first_name: "superuser",
        last_name: "admin",
        login: "superuser",
        email: "juxx@bk.ru",
        group_id: 1,
        password: "111",
        status: "Вкл"
      }
    };
  },
  methods: {
    create() {
      this.createUserGroup();
      this.createSuperuser();
    },
    createUserGroup() {
      const userGroup = superUserService.createSuperUserGroup(this.userGroup);
      userGroup
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createSuperuser() {
      const user = superUserService.createSuperUser(this.user);
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
