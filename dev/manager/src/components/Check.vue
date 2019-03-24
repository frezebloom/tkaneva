<template>
  <div class="check-wrapper">
    <div class="check">
      <div class="check-header">
        <h4>{{ title }}</h4>
      </div>
      <div class="check-body">{{ question }}</div>
      <div class="check-footer">
        <button>Да</button>
        <button>Нет</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Check",
  props: {
    title: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" >
@import "../styles/check.scss";
</style>

