<template>
  <div class="edit-vendor">
    <div v-if="tabs.length > 1">
      <Tabs 
        :tabs="tabs" 
        @eventClickTab="route($event)" 
        @eventClickCloseTab="closeTab($event)" 
      />
    </div>
    <VendorForm 
      title="Редактировать производителя" 
      @eventClickSave="closeTab($event)" 
      :state="vendor"
      :tabs="tabs" 
      :vendors="vendors"
    />
  </div>
</template> 
<script>
import Tabs from "@/components/Tabs";
import DesignForm from "@/components/VendorForm";
import services from "@/services/services";

export default {
  name: "EditVendor",
  components: {
    Tabs,
    VendorForm
  },
  data() {
    return {
      tabs: [],
      vendors: [],
      vendor: {},
    };
  },
  mounted() {
   const vendors = services.get('/api/vendor/get');
    vendors
      .then(vendors => {
        this.vendors = vendors.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  created() {
    const { selectVendors } = this.$route.params;
    if (selectVendors) {
      selectVendors.forEach(element => {
        element['title'] = element.name;
      });
      this.tabs = selectVendors;
      this.vendor = selectVendors[0];
    }
  },
  methods: {
    route(index) {
      this.vendor = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if(index !== element) return item
      })
      this.vendor = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-vendor {
  width: 100%;
}
</style>