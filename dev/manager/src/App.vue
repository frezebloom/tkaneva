<template>
  <div id="app">
    <Header/>
    <div class="wrapper">
      <Sidebar/>
      <Content/>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Content
  }
};
</script>
<style lang="scss">
@import "./styles/reset.scss";
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #ecf0f5;
}
.wrapper {
  display: flex;
}
</style>