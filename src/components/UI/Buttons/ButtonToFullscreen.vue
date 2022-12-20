<template>
  <button class="start">
    {{ text }}
  </button>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: 'Кнопка'
      }
    }
  }
</script>

<style scoped>
.start {
  text-align: center;
  height: 48px;
  padding: 5px 20px;
  border-radius: 2px;
  border: 2px solid #facf5d;
  color: #facf5d;
  background: var(--secondary-dark-gradient);
}
</style>