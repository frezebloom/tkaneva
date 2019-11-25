<template>
  <div class="new-product">
    <ProductForm title="Создать продукт" :state="user" />
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
        properties: {
          structure: "",
          brand: "",
          color: "",
          width: "",
          length: ""
        },
        price: "",
        discount: "",
        description: "",
        status: ""
      }
    };
  }
};
</script>
