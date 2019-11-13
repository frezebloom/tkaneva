<template>
  <div class="new-vendor">
    <VendorForm 
      title="Создать производителя" 
      :state="vendor"
      :designs="vendors"
    />
  </div>
</template>
<script>
import VendorForm from "@/components/VendorForm";
import services from "@/services/services";

export default {
  name: "NewVendor",
  components: {
    VendorForm
  },
  data() {
    return {
      vendor: {
        name: "",
        status: ""
      },
      vendors: [] 
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
  }
};
</script>
