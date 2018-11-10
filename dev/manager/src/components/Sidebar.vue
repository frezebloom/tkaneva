<template>
  <div class="sidebar">
    <ul class="sidebar-menu">
      <li class="sidebar-menu-header">Навигация</li>
      <li class="sidebar-menu-category">Товары</li>
        <ul class="sidebar-menu-subcategory">
          <li><a href="#">Добавить</a></li>
          <li><a href="#">Редактировать</a></li>
          <li><a href="#">Архив</a></li>
        </ul>
      <li class="sidebar-menu-category">Заказы</li>
      <li class="sidebar-menu-category">Пользователи</li>
      
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
.sidebar-menu-subcategory {
  font-size: 12px;
  background-color: #2c3b41;
  color: #b8c7ce;
}
</style>

