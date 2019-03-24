<template>
  <div class="topbar">
    <h3>{{title}}</h3>
    <div class="topbar-btn-group">
      <div class="btn" @click="$emit('eventClickTopBar', 'new user')">
        <img alt="Создать" src="../assets/icons/add.svg">
        <div>Создать</div>
      </div>
      <div class="btn" @click="$emit('eventClickTopBar', 'edit user')">
        <img alt="Изменить" src="../assets/icons/edit.svg">
        <div>Изменить</div>
      </div>
      <div class="btn" @click="$emit('eventClickTopBar', 'delete')">
        <img alt="Удалить" src="../assets/icons/delete.svg">
        <div>Удалить</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Topbar",
  props: {
    title: String
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/topbar.scss";
</style>

