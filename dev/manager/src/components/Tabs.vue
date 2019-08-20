<template>
  <div class="tabs scrolling-wrapper">
    <div
      class="tab"
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :class="{ active: activeTab === index }"
      @click="eventClickTab(index)"
    >
      {{ changeString(tab.fullName) }}
      <div 
        class="tab-close"
        @click.stop="eventClickCloseTab(index)"
      >
        X
      </div>
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
    },
    eventClickCloseTab(index) {
      this.$emit("eventClickCloseTab", index)
      this.activeTab = 0;
    },
    changeString(string) {
      var str = string.slice(0, 11);
      return str + "...";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/tabs.scss";
</style>

