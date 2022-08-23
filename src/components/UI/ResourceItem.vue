<template>
  <div class="resource-item">
    <img :src="require(`@/assets/icons/resources/${name}.png`)" :alt="name" class="resource-image"/>
    <div class="resource-count">{{ count }}</div>
  </div>
</template>

<script>
  export default {
    name: 'resource-item',
    props: {
      name: {
        typr: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
      }
    }
  }
</script>

<style scoped>
  .resource-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .resource-image {
    display: block;
    width: 35px;
    height: 35px;
    margin-bottom: 5px;
  }
</style>