<template>
  <div class="sidebar">
    <ul class="sidebar-menu">
      <li class="sidebar-menu-header">Навигация</li>
      <li class="sidebar-menu-category" @click="open('product')">Продукт</li>
      <ul v-bind:class="{ active: isActive.product }" class="sidebar-menu-subcategory">
        <li>
          <router-link to="/users">
            <div class="sidebar-menu-wrapper">
              <img alt="products" src="../assets/icons/products.svg" />
              <div class="sidebar-menu-title">Товары</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/categories">Категории</router-link>
        </li>
        <li>
          <router-link to="/brands">Производители</router-link>
        </li>
        <li>
          <router-link to="/colors">Расцветки</router-link>
        </li>
      </ul>
      <li class="sidebar-menu-category">Заказы</li>
      <li class="sidebar-menu-category" @click="open('user')">Учетные записи</li>
      <ul v-bind:class="{ active: isActive.user }" class="sidebar-menu-subcategory">
        <li>
          <router-link to="/users">
            <div class="sidebar-menu-wrapper">
              <img alt="users" src="../assets/icons/user.svg" />
              <div class="sidebar-menu-title">Пользователи</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/user-groups">
            <div class="sidebar-menu-wrapper">
              <img alt="users" src="../assets/icons/user-groups.svg" />
              <div class="sidebar-menu-title">Группы</div>
            </div>
          </router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isActive: {
        product: false,
        user: false
      }
    };
  },
  methods: {
    open(element) {
      Object.keys(this.isActive).forEach(item => {
        if (this.isActive[item] !== this.isActive[element])
          this.isActive[item] = false;
      });

      this.isActive[element] = !this.isActive[element];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/sidebar.scss";
</style>
