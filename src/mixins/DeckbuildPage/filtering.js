export default {
  data() {
    return {
      query: {},
      faction: "",
      count: undefined,
    }
  },
  methods: {
    // фильтр карт и лидеров по фракции по нажатию на кнопку фракции
    filter_factions(emit) {
      // если мы нажали кнопку фильтра фракций при сборе колоде, ещё ставим флаг сбора колоды и закрываем окно
      if (this.showNewDeckFactionSelect) {
        // this.cancelFilters() // FIXME: вопрос - сбрасывать ли фильтры по началу сбора колоды
        this.deckBuilding = true
        this.showNewDeckFactionSelect = false
      }

      this.query.faction = emit[0] // для this.query.cards
      this.faction = emit[0][0] // для this.query.leaders
      this.faction_selected = emit[1] // чтобы можно было добавить лидера, онли выбрав фракцию
    },
    filter_types(type) {
      this.query.type = type
    },
    filter_colors(color) {
      this.query.color = color
    },
    filter_passives(passive) {
      this.query.has_passive = passive
    },
    filter_unlocked(count) {
      this.count = count
    },

    reset_filter_types() {
      delete this.query.type
    },
    reset_filter_colors() {
      delete this.query.color
    },
    reset_filter_passives() {
      delete this.query.has_passive
    },
    reset_filter_unlocked() {
      this.count = undefined
    },

    cancelFilters() {
      // в режиме сбора колоды - сбрасываем все фильтры КРОМЕ фракций, иначе - вообще все фильтры
      if (!this.deckBuilding) {
        this.query = {}
        this.faction = ""
        this.reset_filter_unlocked()
        return
      }
      this.reset_filter_types()
      this.reset_filter_colors()
      this.reset_filter_passives()
      this.reset_filter_unlocked()
    },
  },
}
