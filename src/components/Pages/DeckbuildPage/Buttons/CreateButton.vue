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
      default: "Кнопка",
    },
  },
}
</script>

<style scoped>
.background-create-button {
  border-width: 1px;
  border-style: solid;
  border-image: repeating-linear-gradient(#4a4237 0%, #c5a87e 50%, #4a4237 100%)
    1;
  border-radius: 3px;
  overflow: hidden;
}

.create-button {
  padding: 5px 20px;
  font-family: "Inter";
  font-weight: 700;
  font-size: 10px;
  line-height: 10px;
  color: #facf5d;
  background: linear-gradient(
    180deg,
    #1d252d -21.82%,
    rgba(0, 0, 0, 0.13) 44.55%,
    #282d33 109.53%
  );
}
</style>
