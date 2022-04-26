export default {
  data() {
    return {
      query: {},
      faction: '',
      count: undefined,
    }
  },
  methods: {
    // фильтр карт и лидеров по фракции по нажатию на кнопку фракции
    filter_factions(emit) {
      this.query.faction = emit[0]  // для this.query.cards
      this.faction = emit[0][0]  // для this.query.leaders
      this.faction_selected = emit[1]  // чтобы можно было добавить лидера, онли выбрав фракцию
      if (this.deck_is_progress.length) this.new_deck()  // если в процессе сборки переключили фракцию - ОБНУЛИЛИСЬ
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

  },
}