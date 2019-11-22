<template>
  <div class="edit-color">
    <div v-if="tabs.length > 1">
      <Tabs
        :tabs="tabs"
        @eventClickTab="route($event)"
        @eventClickCloseTab="closeTab($event)"
      />
    </div>
    <ColorForm
      title="Редактировать расцветку"
      @eventClickSave="closeTab($event)"
      :state="color"
      :tabs="tabs"
    />
  </div>
</template>
<script>
import Tabs from "@/components/Tabs";
import ColorForm from "@/components/ColorForm";

export default {
  name: "EditColor",
  components: {
    Tabs,
    ColorForm
  },
  data() {
    return {
      tabs: [],
      color: {}
    };
  },
  created() {
    const { selectColors } = this.$route.params;
    if (selectColors) {
      selectColors.forEach(element => {
        element["title"] = element.name;
      });
      this.tabs = selectColors;
      this.color = selectColors[0];
    }
  },
  methods: {
    route(index) {
      this.color = this.tabs[index];
    },
    closeTab(element) {
      this.tabs = this.tabs.filter((item, index) => {
        if (index !== element) return item;
      });
      this.color = this.tabs[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-color {
  width: 100%;
}
</style>
