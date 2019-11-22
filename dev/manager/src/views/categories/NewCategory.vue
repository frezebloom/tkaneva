<template>
  <div class="new-category">
    <CategoryForm 
      title="Создать категорию товаров" 
      :state="category"
    />
  </div>
</template>
<script>
import CategoryForm from "@/components/CategoryForm";

export default {
  name: "NewCategory",
  components: {
    CategoryForm
  },
  data() {
    return {
      category: {
        name: "",
        status: ""
      }
    };
  }
};
</script>
