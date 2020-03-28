<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <Header />
      <div class="wrapper">
        <Sidebar />
        <Content />
      </div>
      <!-- <Footer /> -->
    </div>
    <div v-else>
      <Content />
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";
import Footer from "@/components/Footer.vue";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Content,
    Footer
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
<style lang="scss">
@import "./styles/reset.scss";
html {
  overflow: hidden;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #f4f4f4;
}
.wrapper {
  display: flex;
}
</style>