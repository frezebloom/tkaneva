<template>
  <div class="corner-dialog">
    <div class="corner-dialog-header">
      <div class="corner-dialog-header-title">Успех</div>
      <div class="corner-dialog-header-close">X</div>
    </div>
    <div class="corner-dialog-body">Новый аккаунт успешно создан</div>
    <div class="corner-dialog-footer">
      <div class="corner-dialog-button">
        <Button value="Новый" styles="success"/>
      </div>
      <div class="corner-dialog-button">
        <Button value="Изменить" styles="default"/>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  name: "Corner-dialog",
  components: {
    Button
  }
};
</script>
<style scoped lang="scss">
@import "../styles/cornerDialog.scss";
</style>
