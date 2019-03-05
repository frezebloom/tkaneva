<template>
  <div class="tabs">
    <div class="tabs-wrapper">
      <!-- нужно переделать на универсальный id и поле name -->
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="tab.user_id"
        @click="$emit('eventClickTab', index)"
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
      faketabs: [
        {
          id: 1,
          firstname: "Mikhail"
        },
        {
          id: 2,
          firstname: "Valeria"
        },
        {
          id: 3,
          firstname: "Oleg"
        },
        {
          id: 4,
          firstname: "Pavel"
        },
        {
          id: 5,
          firstname: "Zina"
        }
      ]
    };
  },
  methods: {
    eventClickTab(index) {
      console.log(index);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/tabs.scss";
</style>

