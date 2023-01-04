<template>
  <div class="filter_unlocked">
    <base-title-text @click="reset_filter_types">Наличие</base-title-text>
    <div class="unlocked-block">
      <div class="types" v-for="count in [1, 2, 0]" :key="count">
        <button class="type" @click="filtering(count)">
          {{ count }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTitleText from '@/components/UI/BaseTitleText'
export default {
  components: { BaseTitleText },
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
  margin-top: 20px;
  margin-bottom: 10px;
}
.unlocked-block {
  margin-top: 7px;
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
