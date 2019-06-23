<template>
  <div class="user-group-from">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать группу пользователей</div>
      <div class="form-wrapper">
        <label class="form-label">Название</label>
        <input
          :value="state.name"
          @input="inputHandler($event, 'name')"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-footer">
        <div @click="saveChange" class="form-footer-wrapper">
          <Button value="Сохранить" styles="success"/>
        </div>
        <div @click="$router.go(-1)" class="form-footer-wrapper">
          <Button value="Отмена" styles="default"/>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Button from "@/components/Button";
import userGroupService from "@/services/userGroupService";
export default {
  name: "UserGroupForm",
  components: {
    Button
  },
  props: {
    state: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userGroup: {
        name: this.state.name || ""
      }
    };
  },
  methods: {
    inputHandler(event, params) {
      this.userGroup[params] = event.target.value;
    },
    saveChange() {
      if (!this.state.user_id) {
        const userGroup = userGroupService.createUserGroup(this.userGroup);
        userGroup
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const userGroup = userGroupService.updateUser(this.userGroup);
        userGroup
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>

