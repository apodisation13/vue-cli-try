<template>
  <div class="resource-item">
    <div class="wrapper__resource-image">
      <img
        :src="require(`@/assets/icons/resources/${name}.png`)"
        :alt="name"
        class="resource-image"
      />
    </div>
    <div class="resource-count">{{ count }}</div>
  </div>
</template>

<script>
export default {
  name: "resource-item",
  props: {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped>
.resource-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper__resource-image {
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.resource-image {
  display: block;
  max-width: 35px;
  max-height: 35px;
}

@media (max-width: 640px) {
  .wrapper__resource-image {
    width: 25px;
    height: 25px;
  }
  .resource-image {
    max-width: 25px;
    max-height: 25px;
  }
}
</style>
