<template>
  <div :class="styles" class="btn">
    <div class="btn-val">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    value: {
      type: String,
      required: true
    },
    styles: {
      type: String,
      default: "default"
    }
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
.default {
  background-color: #fbfbfb;
  color: #707070;
  border: 1px double #dfdfdf;
}
.success {
  background-color: #3d9970;
  color: #fff;
}
.warning {
  background-color: #f39c12;
  color: #fff;
}
.danger {
  background-color: #dd4b39;
  color: #fff;
}
</style>
