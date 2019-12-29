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
        category_id: "",
        description: "",
        balance: "",
        structure: "",
        brand_id: "",
        color_id: "",
        width: "",
        length: "",
        density: "",
        price: "",
        discount: "",
        status: ""
      }
    };
  }
};
</script>
