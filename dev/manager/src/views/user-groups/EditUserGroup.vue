<template>
  <div class="edit-user-group">
    <div v-if="tabs.length > 1">
      <Tabs 
        :tabs="tabs" 
        @eventClickTab="route($event)" 
        @eventClickCloseTab="closeTab($event)" 
      />
    </div>
    <UserGroupForm 
      title="Редактировать группу пользователей" 
      @eventClickSave="closeTab($event)" 
      :state="userGroup"
      :tabs="tabs" 
      :userGroups="userGroups"
    />
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import UserGroupForm from "@/components/UserGroupForm";
import services from "@/services/services";

export default {
  name: "EditUserGroup",
  components: {
    Tabs,
    UserGroupForm
  },
  data() {
    return {
      tabs: [],
      userGroups: [],
      userGroup: {},
    };
  },
  mounted() {
   const userGroups = services.get('/api/user-group/get');
    userGroups
      .then(userGroups => {
        this.userGroups = userGroups.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  created() {
    const { selectUserGroups } = this.$route.params;
    if (selectUserGroups) {
      selectUserGroups.forEach(element => {
        element['title'] = element.name;
      });
      this.tabs = selectUserGroups;
      this.userGroup = selectUserGroups[0];
    }
  },
  methods: {
    route(index) {
      this.userGroup = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if(index !== element) return item
      })
      this.userGroup = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-user-group {
  width: 100%;
}
</style>