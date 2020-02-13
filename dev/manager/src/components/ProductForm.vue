<template>
  <div class="product-from">
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
          <label class="form-label">Количество</label>
          <input
            v-model="state.balance"
            @input="inputHandler($event, 'balance')"
            :class="[
              errorInput.includes('balance') ? 'form-input-error' : '',
              'form-input'
            ]"
            class="form-input"
            type="text"
          />
        </div>
        <div class="form-wrapper">
          <label class="form-label">Состав</label>
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
          <label class="form-label">Ширина</label>
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
          <label class="form-label">Длина</label>
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
          <label class="form-label">Плотность</label>
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
          <label class="form-label">Скидка</label>
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
        <div class="form-wrapper">
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            @vdropzone-success="uploadedFile"
            @vdropzone-removed-file="removeFile"
          ></vue-dropzone>
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  name: "ProductForm",
  mixins: [cornerDialog],
  components: {
    Button,
    CornerDialog,
    vueDropzone: vue2Dropzone
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
    products: {
      type: Array,
      required: true
    },
    tabs: {
      type: Array,
      required: false
    },
    categories: {
      type: Array,
      required: true
    },
    brands: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      product: {
        product_id: this.state.product_id || "",
        name: this.state.name || "",
        category_id: this.state.category_id || 1,
        description: this.state.description || "",
        balance: this.state.balance || "1",
        structure: this.state.structure || "",
        brand_id: this.state.brand_id || 1,
        color_id: this.state.color_id || 1,
        width: this.state.width || "",
        length: this.state.length || "",
        density: this.state.density || "",
        price: this.state.price || "",
        discount: this.state.discount || "0",
        status: this.state.status || "Вкл"
      },
      fieldsIsRequired: [
        "name",
        "category_id",
        "description",
        "brand_id",
        "color_id",
        "price"
      ],
      errorMessage: [],
      errorInput: [],
      dropzoneOptions: {
        url: `http://${window.location.hostname}:3000/api/upload/image`,
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: "Поместите файлы сюда, чтобы загрузить",
        dictRemoveFile: "Удалить файл"
      },
      uploadedFiles: []
    };
  },
  methods: {
    inputHandler(event, params) {
      if (!this.state.product_id) {
        this.product[params] = event.target.value;
      } else {
        this.state[params] = event.target.value;
      }
    },
    validation(product) {
      Object.keys(product).forEach(item => {
        if (
          this.fieldsIsRequired.some(element => element === item) &&
          valid.isEmpty(product[item])
        ) {
          this.errorInput.push(item);
          this.errorMessage.push(
            "Поля отмеченные звездочкой обязательны для заполнения"
          );
        }
      });
    },
    check() {
      !this.state.product_id
        ? this.validation(this.product)
        : this.validation(this.state);
      console.log(this.errorInput);
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
    },
    uploadedFile(fileData) {
      const files = JSON.parse(fileData.xhr.response);
      files.forEach(file => this.uploadedFiles.push(file));
    },
    removeFile(fileData) {
      const files = JSON.parse(fileData.xhr.response);
      files.forEach(file =>
        this.uploadedFiles.filter(file => file.filename !== fileName)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
@import "../styles/cornerDialog.scss";
</style>
