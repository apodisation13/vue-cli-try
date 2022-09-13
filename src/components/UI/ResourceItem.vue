<template>
  <div class="resource-item">
    <div class="wrapper__resource-image">
      <img
        :src="require(`@/assets/icons/resources/${name}.svg`)"
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
  width: 60px;
  height: 60px;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.resource-image {
  display: block;
  /* max-width: 35px; */
  max-height: 60px;
}

@media (max-width: 640px) {
  .wrapper__resource-image {
    /* width: 25px; */
    height: 60px;
  }
  .resource-image {
    /* max-width: 25px; */
    max-height: 60px;
  }
}
</style>
