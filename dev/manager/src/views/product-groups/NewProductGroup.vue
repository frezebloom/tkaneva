<template>
  <div class="new-product-group">
    <ProductGroupForm 
      title="Создать категорию товаров" 
      :state="productGroup"
      :productGroups="productGroups"
    />
  </div>
</template>
<script>
import ProductGroupForm from "@/components/ProductGroupForm";
import services from "@/services/services";

export default {
  name: "NewProductGroup",
  components: {
    ProductGroupForm
  },
  data() {
    return {
      productGroup: {
        name: "",
        status: ""
      },
      productGroups: [] 
    };
  },
  mounted() {
    const productGroups = services.get('/api/product-group/get');
    productGroups
      .then(productGroups => {
        this.productGroups = productGroups.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
