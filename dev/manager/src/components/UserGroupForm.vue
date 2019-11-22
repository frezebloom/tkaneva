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
import services from "@/services/services";
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
    },
    tabs: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      userGroup: {
        group_id: this.state.group_id || "",
        name: this.state.name || "",
        status: this.state.status || "Вкл"
      },
      errorMessage: [],
      errorInput: []
    };
  },
  methods: {
    inputHandler(event, params) {
      if (!this.state.group_id) {
        this.userGroup[params] = event.target.value;
      } else {
        this.state[params] = event.target.value;
      }
    },
    validation(userGroup) {
       Object.keys(userGroup).forEach(item => {
        if (valid.isEmpty(userGroup[item]) && item !== "group_id") {
          this.errorInput.push(item);
          this.errorMessage.push(
            "Поля отмеченные звездочкой обязательны для заполнения"
          );
        }
      });
    },
    check() {
      !this.state.group_id ? this.validation(this.userGroup) : this.validation(this.state)
  
      if (this.errorMessage.length > 0) {
        this.showCornerDialog("Ошибка", this.errorMessage[0], "warning");
        this.errorMessage = [];
        setTimeout(() => {
          this.errorInput = [];
        }, 10000);
      } else {
        this.saveChange();
      }
    },
    saveChange() {
      if (!this.state.group_id) {
        const userGroup = services.create('/api/user-group/create', this.userGroup);
        userGroup
          .then(() => {
            this.$router.push({
              name: "user groups",
              params: {
                status: true,
                title: "Успех",
                message: "Новая группа пользователей успешно создана",
                button: "success"
              }
            });
          })
          .catch(() => {
            this.showCornerDialog("Ошибка", 'Не удалось сохранить группу пользователей', "warning");
          });
      } else {
        const userGroup = services.update('/api/user-group/update', this.state);
        userGroup
          .then(() => {
            const index = this.tabs.findIndex((item) => item.group_id === this.state.group_id)
            if(this.tabs.length > 1) {
              this.$emit("eventClickSave", index);
              this.showCornerDialog("Успех", 'Группа пользователей изменена', "success");
            } else {
              this.$router.push({
                name: "user groups",
                params: {
                  status: true,
                  title: "Успех",
                  message: "Группа пользователей изменена",
                  button: "success"
                }
              });
            }
          })
          .catch(error => {
            console.log(error);
            this.showCornerDialog("Ошибка", 'Не удалось сохранить группу пользователей', "warning");
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