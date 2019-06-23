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
.corner-dialog {
  position: fixed;
  width: 400px;
  right: 16px;
  bottom: 60px;
  padding: 32px;
  color: #435a6f;
  box-shadow: #435a6f4d 0px 0px 1px 0px, #435a6f78 0px 16px 24px -8px;
}
.corner-dialog-header {
  display: flex;
  justify-content: space-between;
}
.corner-dialog-header-title {
  font-size: 20px;
}
.corner-dialog-header-close {
  font-size: 16px;
  width: 32px;
  padding: 5px;
  font-weight: 500;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.corner-dialog-header-close:hover {
  background-color: #435a6f0f;
}
.corner-dialog-body {
  padding: 30px;
}
.corner-dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.corner-dialog-button {
  margin: 5px;
}
</style>
