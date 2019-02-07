<template>
  <div class="new-user">
    <Form
      v-bind:input="[
        { title: 'Категория', type: 'select' },
        { title: 'Название', type: 'text' },
        { title: 'Описание', type: 'text' },
        { title: 'Состав', type: 'text' },
        { title: 'Производитель', type: 'select' },
        { title: 'Цвет', type: 'select' },
        { title: 'Цена', type: 'text' },
        { title: 'Скидка', type: 'text' },
        { title: 'Изображения', type: 'file' },
        { title: 'В наличии', type: 'checkbox' },
    ]"
    />
  </div>
</template>
<script>
import Form from "@/components/Form";
export default {
  name: "NewUser",
  components: {
    Form
  }
};
</script>
