<template>
  <base-modal @close-modal="closeModal">
    <div class="deck_builder_filters">
      <button-close-img @click="closeModal" />
      <filter-factions @set-filter="setFilter" v-if="!deckBuilding" />
      <filter-types @set-filter="setFilter" />
      <filter-colors @set-filter="setFilter" />
      <filter-passives @set-filter="setFilter" />
      <filter-unlocked @set-filter="setFilter" />
      <div class="cancel" @click="resetFilters">
        <base-title-text>
          Сбросить
        </base-title-text>
      </div>
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
import ButtonCloseImg from "@/components/UI/Buttons/ButtonCloseImg"
import BaseTitleText from '@/components/UI/BaseTitleText'

export default {
  components: {
    FilterFactions,
    FilterTypes,
    FilterColors,
    FilterPassives,
    FilterUnlocked,
    BaseModal,
    ButtonCloseImg,
    BaseTitleText,
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

<style scoped>
.deck_builder_filters {
  position: relative;
  padding: 40px;
}
.cancel {
  width: 100%;
  padding: 13px;
  margin-top: 80px;
  background-color: #0E4582;
  box-shadow: 5px 9px 20px rgba(0, 0, 0, 0.25), inset -5px -5px 5px rgba(0, 0, 0, 0.25), inset 5px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
</style>
