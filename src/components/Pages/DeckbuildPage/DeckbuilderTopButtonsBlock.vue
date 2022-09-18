<template>
  <div class="deckbuilder-filters">
    <div class="button-filters">
      <button-icon 
        class="filter_btn" 
        :class="{'is-cancel': isCansel}" 
        @click="clickAddButton"
        :image_name="'add_icon.svg'"
      />
      <button class="btn_save_deck filter_btn" @click="showList('pool')">cards</button>
      <button class="btn_save_deck filter_btn" @click="showList('leaders')">leaders</button>
      <button-icon 
        :image_name="'open_filters.svg'" 
        class="filter_btn" 
        @click="$emit('open-filters')"/>
    </div>
    <base-modal v-if="showNewDeckFactionSelect"
      @close-modal="showNewDeckFactionSelect = false"
    >
      <div>Выберете фракцию!</div>
      <filter-factions @set-filter="setFilter" />
    </base-modal>
  </div>
</template>

<script>
import FilterFactions from "@/components/Pages/DeckbuildPage/FilterFactions"
import ButtonIcon from '@/components/Pages/DeckbuildPage/Buttons/ButtonIcon'
import BaseModal from '@/components/UI/BaseModal'
import DeckbuilderFilters from '@/components/Pages/DeckbuildPage/DeckbuilderFilters'

export default {
  components: {
    FilterFactions,
    ButtonIcon,
    BaseModal,
    DeckbuilderFilters,
  },
  props: {
    deckBuilding: {
      type: Boolean,
      default: false,
    },
    empty_filters: {
      type: Boolean,
    }
  },
  data() {
    return {
      showNewDeckFactionSelect: false,
      showFilters: false,
    }
  },
  methods: {
    setFilter(prop, value) {
      // если мы нажали кнопку фильтра фракций при сборе колоде, ещё ставим флаг сбора колоды и закрываем окно
      this.showNewDeckFactionSelect = false
      this.$emit("select_faction", prop, value)
    },
    showList(value) {
      this.$emit("trigger_show_list", value)
    },
    clickAddButton() {
      if (!this.showNewDeckFactionSelect && !this.deckBuilding) {
        this.showNewDeckFactionSelect = true
        return
      }
      this.showNewDeckFactionSelect = false
      this.$emit("reset")
    }
    
  },
  computed: {
    isCansel() {
      return this.showNewDeckFactionSelect || this.deckBuilding
    }
  }
}
</script>

<style scoped>
.button-filters {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter_btn {
  margin: 10px;
}

.is-cancel {
  transform: rotate(45deg);
}

.btn_save_deck {
  display: block;
  height: 3vh;
  width: 23%;
}
</style>
