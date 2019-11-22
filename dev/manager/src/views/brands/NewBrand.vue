<template>
  <div class="new-brand">
    <BrandForm title="Создать производителя" :state="brand" />
  </div>
</template>
<script>
import BrandForm from "@/components/BrandForm";

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
      }
    };
  }
};
</script>
