<template>
  <div class="table-wrapper">
    <table>
      <tr>
        <th>№</th>
        <th>Название</th>
        <th>Позиция</th>
        <th>Действие</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Щелк</td>
        <td>Smith</td>
        <td>
          <input type="checkbox">
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Вязь</td>
        <td>Jackson</td>
        <td>
          <input type="checkbox">
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Вязь</td>
        <td>Jackson</td>
        <td>
          <input type="checkbox">
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Вязь</td>
        <td>Jackson</td>
        <td>
          <input type="checkbox">
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "Table"
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/table.scss";
</style>

