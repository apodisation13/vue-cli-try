<template>
  <div class="filter_types">
    <base-title-text @click="reset_filter_types">Тип</base-title-text>
    <div class="types-block">
      <button-filters-without-bg
        v-for="item in types"
        :key="item"
        @click="filtering(item)"
      >
        {{ item }}
      </button-filters-without-bg>
    </div>
  </div>
</template>

<script>
import BaseTitleText from "@/components/UI/BaseTitleText"
import ButtonFiltersWithoutBg from "@/components/Pages/DeckbuildPage/Buttons/ButtonFiltersWithoutBg"
export default {
  components: { BaseTitleText, ButtonFiltersWithoutBg },
  name: "filter-types",
  data() {
    return {
      types: ["Unit", "Special"],
    }
  },
  methods: {
    filtering(type) {
      this.$emit("set-filter", "type", type)
    },
    reset_filter_types() {
      this.$emit("reset-filter-types")
    },
  },
  emits: ["set-filter", "reset-filter-types"],
}
</script>

<style scoped>
.filter_types {
  margin-top: 35px;
}
.types-block {
  margin-top: 7px;
  display: flex;
  align-items: center;
}
</style>
