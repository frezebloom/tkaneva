<template>
  <div class="sidebar">
    <ul class="sidebar-menu">
      <li class="sidebar-menu-header">Навигация</li>
      <li class="sidebar-menu-category">Товары</li>
      <li class="sidebar-menu-category">Пользователи</li>
      <li class="sidebar-menu-category">Заказы</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Sidebar"
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
.sidebar {
  display: flex;
  background-color: $colorBlack;
  padding-bottom: 10px;
  width: 230px;
  height: 100%;
}
.sidebar-menu-header {
  margin-top: 20px;
  color: #4b646f;
  font-size: 14px;
  background: #1a2226;
  width: 230px;
  padding: 8px 8px 8px 15px;
}
.sidebar-menu-category {
  color: #b8c7ce;
}
</style>

