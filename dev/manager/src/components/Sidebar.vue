<template>
  <div class="sidebar">
    <ul class="sidebar-menu">
      <li class="sidebar-menu-header">Навигация</li>
      <li class="sidebar-menu-category" @click="open">Продукты</li>
      <ul v-bind:class="{ active: isActive }" class="sidebar-menu-subcategory">
        <li>
          <router-link to="/product/new">Товары</router-link>
        </li>
        <li>
          <router-link to="/product/category">Категории</router-link>
        </li>
        <li>
          <a href="#">Производитель</a>
        </li>
        <li>
          <a href="#">Цвет</a>
        </li>
      </ul>
      <li class="sidebar-menu-category">Заказы</li>
      <li class="sidebar-menu-category">Учетные записи</li>
      <ul v-bind:class="{ active: isActive }" class="sidebar-menu-subcategory">
        <li>
          <router-link to="/newproduct">Пользователи</router-link>
        </li>
        <li>
          <router-link to="/category">Категории</router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  data: () => {
    return {
      isActive: false
    };
  },
  methods: {
    open() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
.sidebar {
  display: flex;
  background-color: $colorBlack;
  padding-bottom: 10px;
  width: 230px;
  height: 768px;
  user-select: none;
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
  padding: 12px 55px 12px 15px;
  display: block;
  cursor: pointer;
}
.sidebar-menu-category:hover {
  background-color: #1e282c;
}
.sidebar-menu-subcategory {
  display: block;
  overflow: hidden;
  background-color: #2c3b41;
  max-height: 0px;

  transition: max-height 1s;
}
.sidebar-menu-subcategory a {
  padding: 5px 5px 5px 15px;
  display: block;
  font-size: 14px;
  color: #b8c7ce;
}
.sidebar-menu-subcategory a:hover {
  color: $colorWhite;
}
.sidebar-menu-subcategory a:before {
  content: "⚬ ";
}
.active {
  max-height: 100%;
}
</style>

