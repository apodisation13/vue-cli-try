<template>
  <div class="resource-item">
    <img :src="require(`@/assets/icons/resources/${name}.svg`)" :alt="name" class="resource-image" />
    <resource-count-rombus>{{ count }}</resource-count-rombus>
    </div>
</template>
<script>
import ResourceCountRombus from "@/components/UI/ResourceCountRombus"
export default {
  name: "bonus-page-resource-item",
  components: { ResourceCountRombus },
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  height: 90px;
}

.resource-item:active {
  top: 1px;
  left: 1px;
}

.resource-image {
  height: inherit;
}

/* @media (max-width: 640px) {
  .wrapper__resource-image {
    width: 25px;
    max-height: 25px;
  }
  .resource-image {
    max-width: 25px;
    max-height: 25px;
  }
} */
</style>
