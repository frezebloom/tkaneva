<template>
  <div class="user-group-from">
    <form v-on:submit.prevent class="form">
      <div class="form-header">Создать группу пользователей</div>
      <div class="form-wrapper">
        <label class="form-label">Название</label>
        <input
          :value="state.first_name"
          @input="inputHandler($event, 'first_name')"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-footer">
        <div @click="saveChange" class="form-footer-wrapper">
          <Button value="Сохранить" styles="success"/>
        </div>
        <div class="form-footer-wrapper">
          <Button value="Отмена" styles="default"/>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  name: "UserGroupForm",
  components: {
    Button
  },
  props: {
    state: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>

