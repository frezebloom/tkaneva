<template>
  <table>
    <th v-for="item in title" :key="item.id">{{item}}</th>
    <tr v-for="item in data" :key="item.id">
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.mail}}</td>
      <td>{{item.group}}</td>
      <td>{{item.status}}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: "Table",
  props: {
    data: Array,
    title: Array
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/table.scss";
</style>

