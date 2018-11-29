<template>
  <div class="newproduct">
    <h3>Добавить новый товар</h3>
    <ProductForm
      v-bind:input="[
        { name: 'Категория', type: 'select' },
        { name: 'Название', type: 'text' }, 
        { name: 'Описание', type: 'text' }, 
        { name: 'Состав', type: 'text' },
        { name: 'Производитель', type: 'select' },
        { name: 'Цвет', type: 'select' },
        { name: 'Изображения', type: 'file' },
        { name: 'Цена', type: 'text' },
        { name: 'Скидка', type: 'text' },
        { name: 'В наличии', type: 'checkbox' },
      ]"
    />
  </div>
</template>
<script>
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "App",
  components: {
    ProductForm
  }
};
</script>
<style lang="scss">
h3 {
  font-weight: 500;
  line-height: 1.1;
  margin-bottom: 20px;
}
.newproduct {
  margin: 20px;
}
</style>

