<template>
  <div class="new-product">
    <ProductForm title="Создать товар" :state="product" />
  </div>
</template>
<script>
import ProductForm from "@/components/ProductForm";
import services from "@/services/services";

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
        category: "",
        description: "",
        structure: "",
        brand: "",
        color: "",
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
