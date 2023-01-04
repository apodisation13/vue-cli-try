<template>
  <div class="filter_unlocked">
    <base-title-text @click="reset_filter_types">Наличие</base-title-text>
    <div class="unlocked-block">


      <button-filters-without-bg 
        v-for="count in [1, 2, 0]"
        :key="count"
        @click="filtering(count)">
        {{ (count === 2) ? '>2' : count}}
      </button-filters-without-bg>
    </div>
  </div>
</template>

<script>
import BaseTitleText from '@/components/UI/BaseTitleText'
import ButtonFiltersWithoutBg from '@/components/Pages/DeckbuildPage/Buttons/ButtonFiltersWithoutBg'
export default {
  components: { BaseTitleText, ButtonFiltersWithoutBg },
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
  display: flex;
  align-items: center;
}
</style>
