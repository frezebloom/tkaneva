<template>
  <div class="newproduct">
    <h3>Добавить новый товар</h3>
    <!-- <ProductForm
      :input="[
        { name: 'Категория', type: 'select' },
        { name: 'Название', type: 'text' }, 
        { name: 'Описание', type: 'text' }, 
        { name: 'Состав', type: 'text' },
        { name: 'Производитель', type: 'select' },
        { name: 'Цвет', type: 'select' },
        { name: 'Цена', type: 'text' },
        { name: 'Скидка', type: 'text' },
        { name: 'Изображения', type: 'file' },
        { name: 'В наличии', type: 'checkbox' },
      ]"
    /> -->
  </div>
</template>
<script>

export default {
  name: "App",
  components: {
    ProductForm
  }
};
</script>
<style lang="scss">
@import "../styles/typography.scss";
</style>

