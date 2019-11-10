<template>
  <div class="edit-design">
    <div v-if="tabs.length > 1">
      <Tabs 
        :tabs="tabs" 
        @eventClickTab="route($event)" 
        @eventClickCloseTab="closeTab($event)" 
      />
    </div>
    <DesignForm 
      title="Редактировать расцветку" 
      @eventClickSave="closeTab($event)" 
      :state="design"
      :tabs="tabs" 
      :designs="designs"
    />
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import DesignForm from "@/components/DesignForm";
import services from "@/services/services";

export default {
  name: "EditDesign",
  components: {
    Tabs,
    DesignForm
  },
  data() {
    return {
      tabs: [],
      designs: [],
      design: {},
    };
  },
  mounted() {
   const designs = services.get('/api/design/get');
    designs
      .then(designs => {
        this.designs = designs.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  created() {
    const { selectDesigns } = this.$route.params;
    if (selectDesigns) {
      selectDesigns.forEach(element => {
        element['title'] = element.name;
      });
      this.tabs = selectDesigns;
      this.design = selectDesigns[0];
    }
  },
  methods: {
    route(index) {
      this.design = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if(index !== element) return item
      })
      this.design = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-design {
  width: 100%;
}
</style>