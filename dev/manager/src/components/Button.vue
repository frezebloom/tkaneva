<template>
  <div class="btn">
    <div class="btn-val">
      {{value}}
      <img alt="password" :src="path">
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    value: String,
    path: String
  }
};
</script>
<style scoped lang="scss">
.btn {
  background-color: #3d9970;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  box-shadow: none;
  border: 1px solid transparent;
  cursor: pointer;
}
.btn:hover {
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.2);
}
.btn-val {
  padding: 7px 25px 7px 25px;
}
</style>
