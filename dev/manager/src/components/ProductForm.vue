<template>
  <div class="product-form">
    <div class="product-form-wrapper" v-for="item in input" :key="item.id">
      <label for="product-form-label">{{ item.name }}</label>
      <input class="product-form-input" :type="item.type" :placeholder="item.name">
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
@import "../styles/variables.scss";
label {
  font-size: 13px;
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}
.product-form {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  width: 100%;
  border-radius: 3px;
  border-top: 3px solid $colorBlue;
  background-color: $colorWhite;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.product-form-input {
  display: block;
  width: 50%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
}
</style>
 

