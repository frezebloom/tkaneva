<template>
  <div class="new-category">
    <CategoryForm 
      title="Создать категорию товаров" 
      :state="category"
      :categories="categories"
    />
  </div>
</template>
<script>
import CategoryForm from "@/components/CategoryForm";
import services from "@/services/services";

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
      },
      categories: [] 
    };
  },
  mounted() {
    const categories = services.get('/api/category/get');
    categories
      .then(categories => {
        this.categories = categories.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
