<template>
  <div class="deckbuilder-filters">
    <div class="button-filters">
      <button-icon
        class="filter_btn"
        :class="{ 'is-cancel': isCansel }"
        @click="clickAddButton"
        :image_name="'add_icon.svg'"
      />
      <button-toggle-card-list
        @click="showList('leaders')"
        :isActive="!!(showingList === 'leaders')"
        >Лидеры</button-toggle-card-list
      >
      <button-toggle-card-list
        @click="showList('pool')"
        :isActive="!!(showingList === 'pool')"
        >Основные</button-toggle-card-list
      >
      <button-icon
        class="filter_btn"
        @click="$emit('open-filters')"
        :image_name="'open_filters.svg'"
        :class="[empty_filters ? '' : 'set-filter']"
      />
    </div>
    <base-modal
      v-if="showNewDeckFactionSelect"
      @close-modal="showNewDeckFactionSelect = false"
    >
      <div>Выберете фракцию!</div>
      <filter-factions @set-filter="setFilter" />
    </base-modal>
  </div>
</template>

<script>
import FilterFactions from "@/components/Pages/DeckbuildPage/FilterFactions"
import ButtonIcon from "@/components/Pages/DeckbuildPage/Buttons/ButtonIcon"
import BaseModal from "@/components/UI/BaseModal"
import ButtonToggleCardList from "@/components/Pages/DeckbuildPage/Buttons/ButtonToggleCardList"

export default {
  components: {
    FilterFactions,
    ButtonIcon,
    BaseModal,
    ButtonToggleCardList,
  },
  props: {
    deckBuilding: {
      type: Boolean,
      default: false,
    },
    empty_filters: {
      type: Boolean,
    },
    showingList: {
      type: String,
    },
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
    },
  },
  computed: {
    isCansel() {
      return this.showNewDeckFactionSelect || this.deckBuilding
    },
  },
  emits: ["open-filters", "select_faction", "trigger_show_list", "reset"]
}
</script>

<style scoped>
.button-filters {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter_btn {
  position: relative;
  margin: 10px;
}

.set-filter::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #facf5d;
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
