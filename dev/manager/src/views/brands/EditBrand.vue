<template>
  <div class="edit-brand">
    <div v-if="tabs.length > 1">
      <Tabs 
        :tabs="tabs" 
        @eventClickTab="route($event)" 
        @eventClickCloseTab="closeTab($event)" 
      />
    </div>
    <BrandForm 
      title="Редактировать производителя" 
      @eventClickSave="closeTab($event)" 
      :state="brand"
      :tabs="tabs" 
    />
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import BrandForm from "@/components/BrandForm";

export default {
  name: "EditBrand",
  components: {
    Tabs,
    BrandForm
  },
  data() {
    return {
      tabs: [],
      brand: {},
    };
  },
  created() {
    const { selectBrands } = this.$route.params;
    if (selectBrands) {
      selectBrands.forEach(element => {
        element['title'] = element.name;
      });
      this.tabs = selectBrands;
      this.brand = selectBrands[0];
    }
  },
  methods: {
    route(index) {
      this.brand = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if(index !== element) return item
      })
      this.brand = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-brand {
  width: 100%;
}
</style>