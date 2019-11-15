<template>
  <div class="edit-product-group">
    <div v-if="tabs.length > 1">
      <Tabs 
        :tabs="tabs" 
        @eventClickTab="route($event)" 
        @eventClickCloseTab="closeTab($event)" 
      />
    </div>
    <ProductGroupForm 
      title="Редактировать категорию товаров" 
      @eventClickSave="closeTab($event)" 
      :state="productGroup"
      :tabs="tabs" 
      :productGroups="productGroups"
    />
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import ProductGroupForm from "@/components/ProductGroupForm";
import services from "@/services/services";

export default {
  name: "EditProductGroup",
  components: {
    Tabs,
    ProductGroupForm
  },
  data() {
    return {
      tabs: [],
      productGroups: [],
      productGroup: {},
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
  },
  created() {
    const { selectProductGroups } = this.$route.params;
    if (selectProductGroups) {
      selectProductGroups.forEach(element => {
        element['title'] = element.name;
      });
      this.tabs = selectProductGroups;
      this.userGroup = selectProductGroups[0];
    }
  },
  methods: {
    route(index) {
      this.productGroup = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if(index !== element) return item
      })
      this.productGroup = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-product-group {
  width: 100%;
}
</style>