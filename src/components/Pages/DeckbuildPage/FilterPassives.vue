<template>
  <div class="filter_passives">
    <base-title-text @click="reset_filter_passives">Пассив</base-title-text>
    <div class="passive-block">
      <button-filters-without-bg
        v-for="passive in passives"
        :key="passive"
        @click="filtering(passive)"
      >
        {{ passive }}
      </button-filters-without-bg>
    </div>
  </div>
</template>

<script>
import BaseTitleText from "@/components/UI/BaseTitleText"
import ButtonFiltersWithoutBg from "@/components/Pages/DeckbuildPage/Buttons/ButtonFiltersWithoutBg"
export default {
  components: { BaseTitleText, ButtonFiltersWithoutBg },
  name: "filter-passives",
  data() {
    return {
      passives: [true, false],
    }
  },
  methods: {
    filtering(passive) {
      this.$emit("set-filter", "has_passive", passive)
    },
    reset_filter_passives() {
      this.$emit("reset-filter-passives")
    },
  },
  emits: ["set-filter", "reset-filter-passives"],
}
</script>

<style scoped>
.filter_passives {
  margin-top: 20px;
}
.passive-block {
  margin-top: 7px;
  display: flex;
  align-items: center;
}
</style>
