<template>
  <div class="filter_types">
    <div @click="reset_filter_types">Тип</div>
    <div class="types" v-for="type in types" :key="type">
      <button class="type" @click="filtering(type)">
        {{ type[0] }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-types",
  data() {
    return {
      types: ["Unit", "Special"],
    }
  },
  methods: {
    filtering(type) {
      this.$emit("set-filter", 'type', type)
    },
    reset_filter_types() {
      this.$emit("reset-filter-types")
    },
  },
  emits: ["filter-types", "reset-filter-types"],
}
</script>

<style scoped>
.filter_types {
  margin-bottom: 12%;
}
.types {
  display: inline;
}
.type {
  height: 4vh;
  width: 45%;
  margin: 1%;
}
</style>
