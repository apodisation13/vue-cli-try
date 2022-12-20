<template>
  <div class="global_text filter_title">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.filter_title {
  font-size: 25px;
  margin-bottom: 15px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
