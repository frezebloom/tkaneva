<template>
  <div class="user-group-from">
    <form v-on:submit.prevent class="form">
      <div class="form-header">{{title}}</div>
      <div class="form-wrapper">
        <label class="form-label">Название *</label>
        <input
          v-model="state.name"
          @input="inputHandler($event, 'name')"
          :class="[errorInput.includes('name') ? 'form-input-error' : '', 'form-input']"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-footer">
        <div @click="check" class="form-button">
          <Button value="Сохранить" styles="success"/>
        </div>
        <div @click="$router.go(-1)" class="form-button">
          <Button value="Отмена" styles="default"/>
        </div>
      </div>
    </form>
    <div v-bind:class="[hideCornerDialog ? 'notActive-corner-dialog' : 'isActive-corner-dialog']">
      <CornerDialog
        @eventClickCornerDialog="dialogFromUser"
        :status="cornerDialogStatus"
        :message="cornerDialogMessage"
        :buttonStyle="cornerDialogBtnStyle"
      />
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
import CornerDialog from "@/components/CornerDialog";
import userGroupService from "@/services/userGroupService";
import valid from "@/utils/validation";
import { cornerDialog } from "@/mixins/cornerDialog";
export default {
  name: "UserGroupForm",
  mixins: [cornerDialog],
  components: {
    Button,
    CornerDialog
  },
  props: {
    title: {
      type: String,
      required: true
    },
    state: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userGroup: {
        name: this.state.name || ""
      },
      users: [],
      errorMessage: [],
      errorInput: []
    };
  },
  methods: {
    inputHandler(event, params) {
      this.userGroup[params] = event.target.value;
    },
    validation() {
      function isEmpty(str) {
        return typeof str === "undefined" || str === null || str === "";
      }
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
@import "../styles/cornerDialog.scss";
</style>

