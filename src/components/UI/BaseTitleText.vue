<template>
  <div class="global_text filter_title" :style="{ fontSize: size + 'px' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 16,
    },
  },
}
</script>

<style scoped>
.filter_title {
  font-size: 25px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
