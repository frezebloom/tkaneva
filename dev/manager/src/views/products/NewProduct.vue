<template>
  <div class="new-product">
    <ProductForm title="Создать товар" :state="product" />
  </div>
</template>
<script>
import ProductForm from "@/components/ProductForm";

export default {
  name: "NewProduct",
  components: {
    ProductForm
  },
  data() {
    return {
      product: {
        article: "",
        name: "",
        description: "",
        balance: "",
        structure: "",
        width: "",
        length: "",
        density: "",
        price: "",
        discount: "",
        brand_id: "",
        category_id: "",
        color_id: "",
        status: ""
      }
    };
  }
};
</script>
