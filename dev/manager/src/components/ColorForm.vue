<template>
  <div class="color-from">
    <form v-on:submit.prevent class="form">
      <div class="form-header">{{ title }}</div>
      <div class="form-body">
        <div class="form-wrapper">
          <label class="form-label">Название *</label>
          <input
            v-model="state.name"
            @input="inputHandler($event, 'name')"
            :class="[
              errorInput.includes('name') ? 'form-input-error' : '',
              'form-input'
            ]"
            class="form-input"
            type="text"
          />
        </div>
      </div>
      <div class="form-footer">
        <div @click="check" class="form-button">
          <Button value="Сохранить" styles="success" />
        </div>
        <div @click="$router.go(-1)" class="form-button">
          <Button value="Отмена" styles="default" />
        </div>
      </div>
    </form>
    <div
      v-bind:class="[
        hideCornerDialog ? 'notActive-corner-dialog' : 'isActive-corner-dialog'
      ]"
    >
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
import token from "@/utils/token";
import valid from "@/utils/validation";
import { cornerDialog } from "@/mixins/cornerDialog";
export default {
  name: "ColorForm",
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
      color: {
        color_id: this.state.color_id || "",
        name: this.state.name || "",
        status: this.state.status || "Вкл"
      },
      errorMessage: [],
      errorInput: []
    };
  },
  methods: {
    inputHandler(event, params) {
      if (!this.state.color_id) {
        this.color[params] = event.target.value;
      } else {
        this.state[params] = event.target.value;
      }
    },
    validation(color) {
      Object.keys(color).forEach(item => {
        if (valid.isEmpty(color[item]) && item !== "color_id") {
          this.errorInput.push(item);
          this.errorMessage.push(
            "Поля отмеченные звездочкой обязательны для заполнения"
          );
        }
      });
    },
    check() {
      !this.state.color_id
        ? this.validation(this.color)
        : this.validation(this.state);

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
      token
        .checkToken()
        .then(token => {
          if (!this.state.color_id) {
            services
              .create("/api/color/create", this.color, token)
              .then(() => {
                this.$router.push({
                  name: "colors",
                  params: {
                    status: true,
                    title: "Успех",
                    message: "Новая расцветка успешно создана",
                    button: "success"
                  }
                });
              })
              .catch(error => {
                console.log(`ColorForm-1  ${error}`);
                this.showCornerDialog(
                  "Ошибка",
                  "Не удалось сохранить расцветку",
                  "warning"
                );
              });
          } else {
            services
              .update("/api/color/update", this.state, token)
              .then(() => {
                const index = this.tabs.findIndex(
                  item => item.color_id === this.state.color_id
                );

                if (this.tabs.length > 1) {
                  this.$emit("eventClickSave", index);
                  this.showCornerDialog(
                    "Успех",
                    "Расцветка изменена",
                    "success"
                  );
                } else {
                  this.$router.push({
                    name: "colors",
                    params: {
                      status: true,
                      title: "Успех",
                      message: "Расцветка изменена",
                      button: "success"
                    }
                  });
                }
              })
              .catch(error => {
                console.log(`ColorForm-2  ${error}`);
                this.showCornerDialog(
                  "Ошибка",
                  "Не удалось сохранить расцветку",
                  "warning"
                );
              });
          }
        })
        .catch(error => {
          console.log(`ColorForm-3  ${error}`);
          this.showCornerDialog(
            "Ошибка",
            "Не удалось сохранить расцветку",
            "warning"
          );
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
@import "../styles/cornerDialog.scss";
</style>
