<template>
  <div class="category">
    <h3>Категории</h3>
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

