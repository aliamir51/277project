<template>

      <b-button block variant="primary">Primary</b-button>

</template>

<script>
export default {
  name: "button",
  data: () => {
    return { togglePress: false };
  }
};
</script>

<style scoped>
.btn.disabled {
  cursor: auto;
}
</style>
