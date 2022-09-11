<template>
  <div class="deckbuilder-filters">
    <div class="button-filters">
      <button
        class="btn_save_deck"
        v-if="!showNewDeckFactionSelect && !deckBuilding"
        @click="startDeckBuilding"
      >
        Новая
      </button>
      <button class="btn_save_deck" v-else @click="cancelBild">
        Отмена
      </button>
      <button class="btn_save_deck" @click="showLeaders = false">cards</button>
      <button class="btn_save_deck" @click="showLeaders = true">leaders</button>
      <button
        :class="filters_enabled ? 'filters_enabled' : 'filters_disabled'"
        @click="showFilters = !showFilters"
      >
        filters
      </button>
    </div>
    <div class="new_deck_faction_select" v-if="showNewDeckFactionSelect">
      <div>Выберете фракцию!</div>
      <filter-factions @filter-factions="filter_factions" />
    </div>
  </div>
</template>

<script>
import FilterFactions from '@/components/Pages/DeckbuildPage/FilterFactions';
  export default {
  components: { FilterFactions },
    props: {
      deckBuilding: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        showNewDeckFactionSelect: false,
      }
    },
    methods: {
      startDeckBuilding() {
        this.showNewDeckFactionSelect = true
      },
      cancelBild() {
        this.showNewDeckFactionSelect = false;
        this.$emit('reset');
      }
    }
  }
</script>

<style scoped>
.new_deck_faction_select {
  position: absolute;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 200px;
  border-radius: 18px;
  padding: 45px 22px;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.filters_enabled {
  height: 3vh;
  width: 23%;
  background-color: greenyellow;
}

.filters_disabled {
  height: 3vh;
  width: 23%;
}

</style>