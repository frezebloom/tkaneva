<template>
  <div class="new-product">
    <ProductForm
      title="Создать товар"
      :state="product"
      :products="products"
      :categories="categories"
      :brands="brands"
      :colors="colors"
    />
  </div>
</template>
<script>
import ProductForm from "@/components/ProductForm";
import services from "@/services/services";
import token from "@/utils/token";

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
      },
      products: [],
      categories: [],
      brands: [],
      colors: []
    };
  },
  mounted() {
    token
      .checkToken()
      .then(token => {
        services.get("/api/category/get", token).then(categories => {
          this.categories = categories.data;
        });

        services.get("/api/brand/get", token).then(brands => {
          this.brands = brands.data;
        });

        services.get("/api/color/get", token).then(colors => {
          this.colors = colors.data;
        });
      })
      .catch(error => {
        console.log(`NewProduct-1  ${error}`);
      });
  }
};
</script>
