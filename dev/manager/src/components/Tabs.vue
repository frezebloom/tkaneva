<template>
  <div class="tabs">
    <div class="tabs-wrapper">
      <!-- нужно переделать на универсальный id и поле name -->
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="tab.user_id"
        :class="{ active: activeTab === index }"
        @click="eventClickTab(index)"
      >{{ tab.firstname }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0
    };
  },
  methods: {
    eventClickTab(index) {
      this.$emit("eventClickTab", index);
      this.activeTab = index;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/tabs.scss";
</style>

