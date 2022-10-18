<template>
  <div class="background-create-button">
    <div class="create-button">{{ name }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: 'Кнопка',
      }
    }
  }
</script>

<style scoped>

.background-create-button {
  border-width: 1px;
  border-style: solid;
  border-image: repeating-linear-gradient(#4A4237 0%, #C5A87E 50%, #4A4237 100%) 1;
  border-radius: 3px;
  overflow: hidden;
}

.create-button {
  padding: 5px 20px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 10px;
  line-height: 10px;
  color: #FACF5D;
  background: linear-gradient(180deg, #1D252D -21.82%, rgba(0, 0, 0, 0.13) 44.55%, #282D33 109.53%);
}
</style>