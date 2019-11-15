<template>
  <div class="new-brand">
    <BrandForm 
      title="Создать производителя" 
      :state="brand"
      :brands="brands"
    />
  </div>
</template>
<script>
import BrandForm from "@/components/BrandForm";
import services from "@/services/services";

export default {
  name: "NewBrand",
  components: {
    BrandForm
  },
  data() {
    return {
      brand: {
        name: "",
        status: ""
      },
      brands: [] 
    };
  },
  mounted() {
    const brands = services.get('/api/brand/get');
    brands
      .then(brands => {
        this.brands = brands.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
