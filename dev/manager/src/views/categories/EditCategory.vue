<template>
  <div class="edit-category">
    <div v-if="tabs.length > 1">
      <Tabs 
        :tabs="tabs" 
        @eventClickTab="route($event)" 
        @eventClickCloseTab="closeTab($event)" 
      />
    </div>
    <CategoryForm 
      title="Редактировать категорию товаров" 
      @eventClickSave="closeTab($event)" 
      :state="category"
      :tabs="tabs"
    />
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import CategoryForm from "@/components/CategoryForm";

export default {
  name: "EditCategory",
  components: {
    Tabs,
    CategoryForm
  },
  data() {
    return {
      tabs: [],
      category: {},
    };
  },
  created() {
    const { selectCategories } = this.$route.params;
    if (selectCategories) {
      selectCategories.forEach(element => {
        element['title'] = element.name;
      });
      this.tabs = selectCategories;
      this.category = selectCategories[0];
    }
  },
  methods: {
    route(index) {
      this.category = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if(index !== element) return item
      })
      this.category = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-category {
  width: 100%;
}
</style>