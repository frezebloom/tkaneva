<template>
  <div class="topbar">
    <h3>{{title}}</h3>
    <div class="topbar-search">
      <input type="text" @input="$emit('eventSearch', $event.target.value)" v-model="searchInput" placeholder="Поиск...">
      <div class="topbar-search-button">
        <img alt="Стереть" @click="$emit('eventClearSearch'), clearInput()" src="../assets/icons/cross.svg">
      </div>
    </div>
    
    <div class="topbar-btn-group">
      <div class="btn" @click="$emit('eventClickTopBar', 'new')">
        <img alt="Создать" src="../assets/icons/add.svg">
        <div>Создать</div>
      </div>
      <div class="btn" @click="$emit('eventClickTopBar', 'edit')">
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
  },
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    clearInput() {
      this.searchInput = '';
    }
  }
}; 
</script>
<style lang="scss" scoped>
@import "../styles/topbar.scss";
</style>

