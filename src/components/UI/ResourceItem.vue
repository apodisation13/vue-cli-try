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
      // default: 0,
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.resource-image {
  display: block;
  width: 35px;
  max-height: 30px;
}

.resource-count {
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 120%;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 640px) {
  .wrapper__resource-image {
    /* width: 25px; */
    max-height: 25px;
  }
  .resource-image {
    /* max-width: 25px; */
    max-height: 25px;
  }
}
</style>
