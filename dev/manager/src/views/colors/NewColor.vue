<template>
  <div class="new-color">
    <ColorForm title="Создать расцветку" :state="color" :colors="colors" />
  </div>
</template>
<script>
import ColorForm from "@/components/ColorForm";
import services from "@/services/services";

export default {
  name: "NewColor",
  components: {
    ColorForm
  },
  data() {
    return {
      color: {
        name: "",
        status: ""
      },
      colors: []
    };
  },
  mounted() {
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
