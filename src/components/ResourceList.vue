<template>
  <div class="resource-list">
    <resource-item
      v-for="(count, name) in resource"
      :key="name"
      :name="name"
      :count="count"
    />
  </div>
</template>

<script>
import ResourceItem from "@/components/UI/ResourceItem"

export default {
  components: { ResourceItem },
  name: "resource-list",
  computed: {
    resource() {
      return this.$store.getters["resource"]
    },
  },
}
</script>

<style scoped>
div {
  font-family: "Brush Script MT", cursive;
  font-size: 14pt;
}

.resource-list {
  max-width: 270px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  margin-left: 5px;
}
</style>
