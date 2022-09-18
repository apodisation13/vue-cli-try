<template>
  <base-modal @close-modal="closeModal">
    <div class="filters">
      <button class="new" @click="closeModal">Закрыть</button>
      <button class="new" @click="cancelFilters">Сброс фильтров</button>
      <filter-factions
        @filter-factions="filter_factions"
        v-if="!deckBuilding"
      />
      <filter-types
        @filter-types="filter_types"
      />
      <filter-colors
        @filter-colors="filter_colors"
      />
      <filter-passives
        @filter-passives="filter_passives"
      />
      <filter-unlocked
        @filter-unlocked="filter_unlocked"
      />
    </div>
  </base-modal>
</template>

<script>
  import FilterFactions from "@/components/Pages/DeckbuildPage/FilterFactions"
  import FilterTypes from "@/components/Pages/DeckbuildPage/FilterTypes"
  import FilterColors from "@/components/Pages/DeckbuildPage/FilterColors"
  import FilterPassives from "@/components/Pages/DeckbuildPage/FilterPassives"
  import FilterUnlocked from '@/components/Pages/DeckbuildPage/FilterUnlocked'
import BaseModal from '@/components/UI/BaseModal'

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
      }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal')
      },
      resetFilters() {

      }
    }
    
  }
</script>

<style scoped>

</style>