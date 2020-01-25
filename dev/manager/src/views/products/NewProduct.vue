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
      categories: [],
      brands: [],
      colors: []
    };
  },
  mounted() {
    const products = services.get("/api/product/get");
    products
      .then(products => {
        console.log(products);
        this.products = products.data;
      })
      .catch(error => {
        console.error(error);
      });
    const categories = services.get("/api/category/get");
    categories
      .then(categories => {
        console.log(categories);
        this.categories = categories.data;
      })
      .catch(error => {
        console.error(error);
      });
    const brands = services.get("/api/brand/get");
    brands
      .then(brands => {
        this.brands = brands.data;
      })
      .catch(error => {
        console.error(error);
      });
    const colors = services.get("/api/color/get");
    colors
      .then(colors => {
        this.colors = colors.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
