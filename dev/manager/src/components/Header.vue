<template>
  <header class="header">
    <div class="header-logo">
      System Manager
    </div>
  </header>
</template>
<script>
export default {
  name: "Header"
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
header {
  background-color: $colorBlue;
  max-height: 100px;
}
.header-logo {
  color: $colorWhite;
  background-color: #367fa9;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  text-align: center;
  width: 230px;
}
</style>

