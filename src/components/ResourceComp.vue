<template>
  <div>
    Ресурсов - {{ resource }}
  </div>
</template>

<script>
export default {
  name: "resource-comp",
  computed: {
    resource() {
      return this.$store.getters["resource"]
    },
  },
}
</script>

<style scoped>

</style>