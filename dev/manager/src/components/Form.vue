<template>
  <div class="form">
    <div class="form-wrapper" v-for="item in input" :key="item.id">
      <label for="form-label">{{ item.name }}</label>
      <input class="form-input" :type="item.type" :placeholder="item.title">
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductForm",
  props: {
    input: Array
  }
};
</script>

<style lang="scss" scoped>
</style>
 

