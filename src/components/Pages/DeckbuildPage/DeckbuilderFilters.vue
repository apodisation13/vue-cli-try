<template>
  <base-modal @close-modal="closeModal">
    <div class="filters">
      <button class="new" @click="closeModal">Закрыть</button>
      <button class="new" @click="resetFilters">Сброс фильтров</button>
      <filter-factions @set-filter="setFilter" v-if="!deckBuilding" />
      <filter-types @set-filter="setFilter" />
      <filter-colors @set-filter="setFilter" />
      <filter-passives @set-filter="setFilter" />
      <filter-unlocked @set-filter="setFilter" />
    </div>
  </base-modal>
</template>

<script>
import FilterFactions from "@/components/Pages/DeckbuildPage/FilterFactions"
import FilterTypes from "@/components/Pages/DeckbuildPage/FilterTypes"
import FilterColors from "@/components/Pages/DeckbuildPage/FilterColors"
import FilterPassives from "@/components/Pages/DeckbuildPage/FilterPassives"
import FilterUnlocked from "@/components/Pages/DeckbuildPage/FilterUnlocked"
import BaseModal from "@/components/ModalWindows/BaseModal"

export default {
  components: {
    FilterFactions,
    FilterTypes,
    FilterColors,
    FilterPassives,
    FilterUnlocked,
    BaseModal,
  },
  props: {
    deckBuilding: {
      type: Boolean,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal")
    },
    resetFilters() {
      this.$emit("reset-filters")
    },
    setFilter(prop, value) {
      this.$emit("set-filter", prop, value)
    },
  },
  emits: ["close-modal", "reset-filters", "set-filter"],
}
</script>

<style scoped></style>
