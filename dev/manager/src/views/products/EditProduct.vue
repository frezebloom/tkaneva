<template>
  <div class="edit-product">
    <div v-if="tabs.length > 1">
      <Tabs :tabs="tabs" @eventClickTab="route($event)" @eventClickCloseTab="closeTab($event)" />
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
import token from "@/utils/token";

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
    token
      .checkToken()
      .then(token => {
        Promise.all([
          services.get("/api/category/get", token),
          services.get("/api/brand/get", token),
          services.get("/api/color/get", token)
        ]).then(values => {
          this.categories = values[0].data;
          this.brands = values[1].data;
          this.colors = values[2].data;
        });
      })
      .catch(error => {
        console.log(`EditProduct-1  ${error}`);
      });
  },
  created() {
    const { selectProducts } = this.$route.params;
    if (selectProducts) {
      selectProducts.forEach(element => {
        element["title"] = element.name;
      });
      this.tabs = selectProducts;
      this.product = selectProducts[0];
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
      this.product = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-product {
  width: 100%;
}
</style>
