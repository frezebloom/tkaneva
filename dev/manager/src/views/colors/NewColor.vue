<template>
  <div class="new-color">
    <ColorForm title="Создать расцветку" :state="color" />
  </div>
</template>
<script>
import ColorForm from "@/components/ColorForm";

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
      }
    };
  }
};
</script>
