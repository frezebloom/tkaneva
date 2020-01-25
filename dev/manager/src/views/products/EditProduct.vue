<template>
  <div class="edit-product">
    <div v-if="tabs.length > 1">
      <Tabs
        :tabs="tabs"
        @eventClickTab="route($event)"
        @eventClickCloseTab="closeTab($event)"
      />
    </div>
    <ProductForm
      title="Редактировать товар"
      @eventClickSave="closeTab($event)"
      :state="product"
      :products="products"
      :tabs="tabs"
      :categories="categories"
      :brands="brands"
      :colors="colors"
    />
  </div>
</template>
<script>
import Tabs from "@/components/Tabs";
import ProductForm from "@/components/ProductForm";
import services from "@/services/services";

export default {
  name: "EditProduct",
  components: {
    Tabs,
    ProductForm
  },
  data() {
    return {
      tabs: [],
      products: [],
      product: {},
      categories: [],
      brands: [],
      colors: []
    };
  },
  mounted() {
    const products = services.get("/api/product/get");
    products
      .then(products => {
        this.products = products.data;
      })
      .catch(error => {
        console.error(error);
      });
    const categories = services.get("/api/category/get");
    categories
      .then(categories => {
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
  },
  created() {
    const { selectProducts } = this.$route.params;
    if (selectProducts) {
      selectProducts.forEach(element => {
        element["title"] = element.fullName;
      });
      this.tabs = selectProducts;
      this.user = selectProducts[0];
    }
  },
  methods: {
    route(index) {
      this.product = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if (index !== element) return item;
      });
      this.user = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-product {
  width: 100%;
}
</style>
