<template>
  <div class="corner-dialog">
    <div class="corner-dialog-header">
      <div class="corner-dialog-header-title">{{status}}</div>
      <div @click="$emit('eventClickCornerDialog', true)" class="corner-dialog-header-close">X</div>
    </div>
    <div class="corner-dialog-body">{{message}}</div>
    <div class="corner-dialog-footer">
      <div @click="$emit('eventClickCornerDialog', true)" class="corner-dialog-button">
        <Button value="ОК" :styles="buttonStyle" />
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  name: "Corner-dialog",
  components: {
    Button
  },
  props: {
    status: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    buttonStyle: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped lang="scss">
@import "../styles/cornerDialog.scss";
</style>
