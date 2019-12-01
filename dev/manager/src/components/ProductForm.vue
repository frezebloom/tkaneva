<template>
  <div class="product-from">
    <form v-on:submit.prevent class="form">
      <div class="form-header">{{ title }}</div>
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
      <div class="form-wrapper">
        <label class="form-label">Категория *</label>
        <select
          class="form-select"
          @input="inputHandler($event, 'category_id')"
        >
          <option
            v-for="(option, index) in categories"
            :key="index"
            :value="option.category_id"
            :selected="
              option.category_id === state.category_id ? 'selected' : ''
            "
            >{{ option.name }}</option
          >
        </select>
      </div>
      <div class="form-wrapper">
        <label class="form-label">Описание *</label>
        <textarea
          v-model="state.description"
          @input="inputHandler($event, 'description')"
          :class="[
            errorInput.includes('description') ? 'form-input-error' : '',
            'form-input'
          ]"
          class="form-input form-area"
        >
        </textarea>
      </div>
      <div class="form-wrapper">
        <label class="form-label">Состав *</label>
        <input
          v-model="state.structure"
          @input="inputHandler($event, 'structure')"
          :class="[
            errorInput.includes('structure') ? 'form-input-error' : '',
            'form-input'
          ]"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Производитель *</label>
        <select class="form-select" @input="inputHandler($event, 'brand_id')">
          <option
            v-for="(option, index) in brands"
            :key="index"
            :value="option.brand_id"
            :selected="option.brand_id === state.brand_id ? 'selected' : ''"
            >{{ option.name }}</option
          >
        </select>
      </div>
      <div class="form-wrapper">
        <label class="form-label">Расцветка *</label>
        <select class="form-select" @input="inputHandler($event, 'color_id')">
          <option
            v-for="(option, index) in colors"
            :key="index"
            :value="option.color_id"
            :selected="option.color_id === state.color_id ? 'selected' : ''"
            >{{ option.name }}</option
          >
        </select>
      </div>
      <div class="form-wrapper">
        <label class="form-label">Ширина *</label>
        <input
          v-model="state.width"
          @input="inputHandler($event, 'width')"
          :class="[
            errorInput.includes('width') ? 'form-input-error' : '',
            'form-input'
          ]"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Длина *</label>
        <input
          v-model="state.length"
          @input="inputHandler($event, 'length')"
          :class="[
            errorInput.includes('length') ? 'form-input-error' : '',
            'form-input'
          ]"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Плотность *</label>
        <input
          v-model="state.density"
          @input="inputHandler($event, 'density')"
          :class="[
            errorInput.includes('density') ? 'form-input-error' : '',
            'form-input'
          ]"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Цена *</label>
        <input
          v-model="state.price"
          @input="inputHandler($event, 'price')"
          :class="[
            errorInput.includes('price') ? 'form-input-error' : '',
            'form-input'
          ]"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-wrapper">
        <label class="form-label">Скидка *</label>
        <input
          v-model="state.discount"
          @input="inputHandler($event, 'discount')"
          :class="[
            errorInput.includes('discount') ? 'form-input-error' : '',
            'form-input'
          ]"
          class="form-input"
          type="text"
        />
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
  name: "ProductForm",
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
      product: {
        product_id: this.state.product_id || "",
        name: this.state.name || "",
        status: this.state.status || "Вкл"
      },
      errorMessage: [],
      errorInput: []
    };
  },
  methods: {
    inputHandler(event, params) {
      if (!this.state.brand_id) {
        this.brand[params] = event.target.value;
      } else {
        this.state[params] = event.target.value;
      }
    },
    validation(brand) {
      Object.keys(brand).forEach(item => {
        if (valid.isEmpty(brand[item]) && item !== "brand_id") {
          this.errorInput.push(item);
          this.errorMessage.push(
            "Поля отмеченные звездочкой обязательны для заполнения"
          );
        }
      });
    },
    check() {
      !this.state.brand_id
        ? this.validation(this.brand)
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
      if (!this.state.product_id) {
        const product = services.create("/api/product/create", this.product);
        product
          .then(() => {
            this.$router.push({
              name: "products",
              params: {
                status: true,
                title: "Успех",
                message: "Новый товар успешно создан",
                button: "success"
              }
            });
          })
          .catch(() => {
            this.showCornerDialog(
              "Ошибка",
              "Не удалось сохранить товар",
              "warning"
            );
          });
      } else {
        const product = services.update("/api/product/update", this.state);
        product
          .then(() => {
            const index = this.tabs.findIndex(
              item => item.product_id === this.state.product_id
            );
            if (this.tabs.length > 1) {
              this.$emit("eventClickSave", index);
              this.showCornerDialog("Успех", "Товар изменен", "success");
            } else {
              this.$router.push({
                name: "products",
                params: {
                  status: true,
                  title: "Успех",
                  message: "Товар изменен",
                  button: "success"
                }
              });
            }
          })
          .catch(error => {
            console.log(error);
            this.showCornerDialog(
              "Ошибка",
              "Не удалось сохранить товар",
              "warning"
            );
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
