<template>
  <div class="edit-user">
    <div v-if="tabs.length > 1">
      <Tabs :tabs="tabs" @eventClickTab="route($event)" @eventClickCloseTab="closeTab($event)" />
    </div>
    <UserForm
      title="Редактировать акаунт"
      @eventClickSave="closeTab($event)"
      :state="user"
      :userGroups="userGroups"
      :tabs="tabs"
      :users="users"
    />
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import UserForm from "@/components/UserForm";
import services from "@/services/services";
import token from "@/utils/token";

export default {
  name: "EditUser",
  components: {
    Tabs,
    UserForm
  },
  data() {
    return {
      tabs: [],
      users: [],
      user: {},
      userGroups: []
    };
  },
  mounted() {
    token
      .checkToken()
      .then(token => {
        services.get("/api/user/get", token).then(users => {
          this.users = users.data;
        });

        services.get("/api/user-group/get", token).then(userGroups => {
          this.userGroups = userGroups.data;
        });
      })
      .catch(error => {
        console.log(`EditUser-1  ${error}`);
      });
  },
  created() {
    const { selectUsers } = this.$route.params;
    if (selectUsers) {
      selectUsers.forEach(element => {
        element["title"] = element.fullName;
      });
      this.tabs = selectUsers;
      this.user = selectUsers[0];
    }
  },
  methods: {
    route(index) {
      this.user = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if (index !== element) return item;
      });
      this.user = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-user {
  width: 100%;
}
</style>

