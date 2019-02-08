<template>
  <div class="new-user">
    <Form
      v-bind:input="[
        { title: 'Имя', type: 'select' },
        { title: 'Фамилия', type: 'text' },
        { title: 'Почта', type: 'text' },
        { title: 'Группа', type: 'select' },
        { title: 'Статус', type: 'checkbox' },
        { title: 'Пароль', type: 'password' },
        { title: 'Повторите пароль', type: 'password' },
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
