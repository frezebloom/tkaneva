<template>
  <div class="category">
    <div class="category-header">
      <h3>Категории</h3>
      <div class="category-header-btn-group">
        <div class="btn-add">+</div>
        <div class="btn-delete">-</div>
      </div>
    </div>
    <Table/>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";

export default {
  name: "Category",
  components: {
    Table
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/typography.scss";
</style>

