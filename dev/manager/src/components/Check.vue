<template>
  <div v-if="hideCheck" class="check-wrapper">
    <div class="check">
      <div class="check-header">
        <h4>{{ header }}</h4>
      </div>
      <div class="check-body">{{ question }}</div>
      <div class="check-footer">
        <button @click="$emit('eventClickCheck', true)">Да</button>
        <button @click="$emit('eventClickCheck', false)">Нет</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Check",
  props: {
    header: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    hideCheck: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" >
@import "../styles/check.scss";
</style>

