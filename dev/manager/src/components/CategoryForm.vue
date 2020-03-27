<template>
  <div class="category-from">
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
import valid from "@/utils/validation";
import { cornerDialog } from "@/mixins/cornerDialog";
export default {
  name: "CategoryForm",
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
      category: {
        category_id: this.state.category_id || "",
        name: this.state.name || "",
        status: this.state.status || "Вкл"
      },
      errorMessage: [],
      errorInput: []
    };
  },
  methods: {
    inputHandler(event, params) {
      if (!this.state.category_id) {
        this.category[params] = event.target.value;
      } else {
        this.state[params] = event.target.value;
      }
    },
    validation(category) {
      Object.keys(category).forEach(item => {
        if (valid.isEmpty(category[item]) && item !== "category_id") {
          this.errorInput.push(item);
          this.errorMessage.push(
            "Поля отмеченные звездочкой обязательны для заполнения"
          );
        }
      });
    },
    check() {
      !this.state.category_id
        ? this.validation(this.category)
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
          if (!this.state.category_id) {
            services
              .create("/api/category/create", this.category, token)
              .then(() => {
                this.$router.push({
                  name: "categories",
                  params: {
                    status: true,
                    title: "Успех",
                    message: "Новая категория товаров успешно создана",
                    button: "success"
                  }
                });
              })
              .catch(error => {
                console.log(`CategoryForm-1  ${error}`);
                this.showCornerDialog(
                  "Ошибка",
                  "Не удалось сохранить категорию товаров",
                  "warning"
                );
              });
          } else {
            services
              .update("/api/category/update", this.state, token)
              .then(() => {
                const index = this.tabs.findIndex(
                  item => item.category_id === this.state.category_id
                );

                if (this.tabs.length > 1) {
                  this.$emit("eventClickSave", index);
                  this.showCornerDialog(
                    "Успех",
                    "Категория товаров изменена",
                    "success"
                  );
                } else {
                  this.$router.push({
                    name: "categories",
                    params: {
                      status: true,
                      title: "Успех",
                      message: "Категория товаров изменена",
                      button: "success"
                    }
                  });
                }
              })
              .catch(error => {
                console.log(`CategoryForm-2  ${error}`);
                this.showCornerDialog(
                  "Ошибка",
                  "Не удалось сохранить категорию товаров",
                  "warning"
                );
              });
          }
        })
        .catch(error => {
          console.log(`CategoryForm-3  ${error}`);
          this.showCornerDialog(
            "Ошибка",
            "Не удалось сохранить категорию товаров",
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
