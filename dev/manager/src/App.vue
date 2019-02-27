<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <Header/>
    </div>
    <div class="wrapper">
      <div v-if="isAuthenticated">
        <Sidebar/>
      </div>

      <Content/>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Content
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
<style lang="scss">
@import "./styles/reset.scss";
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #f4f4f4;
}
.wrapper {
  display: flex;
}
</style>