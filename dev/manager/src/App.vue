<template>
  <div id="app">
    <Header />
    <Sidebar />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar
  }
};
</script>
<style lang="scss">
@import "./styles/reset.scss";
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #fcf0f5;
}
</style>