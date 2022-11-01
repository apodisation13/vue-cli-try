<template>
  <div class="filter_unlocked">
    <div @click="reset_filter_types">Наличие</div>
    <div class="types" v-for="count in [1, 2, 0]" :key="count">
      <button class="type" @click="filtering(count)">
        {{ count }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-unlocked",
  methods: {
    filtering(count) {
      this.$emit("set-filter", "count", count)
    },
    reset_filter_types() {
      this.$emit("reset-filter-unlocked")
    },
  },
  emits: ["set-filter", "reset-filter-unlocked"],
}
</script>

<style scoped>
.filter_unlocked {
  margin-top: 12%;
}
.types {
  display: inline;
}
.type {
  height: 4vh;
  width: 31%;
  margin: 1%;
}
</style>
