<template>
  <div class="corner-dialog">
    <div class="corner-dialog-header">
      <div class="corner-dialog-header-title">Успех</div>
      <div class="corner-dialog-header-close">X</div>
    </div>
    <div class="corner-dialog-body">Новый аккаунт успешно создан</div>
    <div class="corner-dialog-footer">
      <div class="corner-dialog-button">
        <Button value="Сохранить" styles="success"/>
        <Button value="Отмена" styles="success"/>
      </div>
      <div class="corner-dialog-button"></div>
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
.corner-dialog {
  position: fixed;
  width: 392px;
  right: 16px;
  bottom: 70px;
  padding: 32px;
  color: #435a6f;
  box-shadow: #435a6f4d 0px 0px 1px 0px, #435a6f78 0px 16px 24px -8px;
}
.corner-dialog-button {
  display: flex;
}
</style>
