export default {
  data() {
    return {
      ability: "", // параметр для выхода из эмита
      cards_pool: [], // список карт, которые будем показывать в окне
      show_pick_a_card_selection: false, // показать ли окно
      show_picked_card: false, // показать ли выбранную карту из абилок play_from_
    }
  },
  methods: {
    // !!!МЕНЕДЖЕР особых абилок, которые требуют каких-либо окон!!!
    special_case_abilities() {
      const ability = this.selected_card.ability.name

      if (ability === "resurrect") {
        this.cards_pool = this.gameObj.grave.filter(
          card => card.type === "Unit" && card.id !== this.selected_card.id
        )
      } else if (ability === "draw-two-cards") {
        if (this.calc_can_draw()) this.draw_one_card()
        if (this.calc_can_draw()) this.draw_one_card()
      } else if (ability === "give-charges-to-card-in-hand-1") {
        this.cards_pool = this.gameObj.hand.filter(
          card => card.color === "Bronze" && card.id !== this.selected_card.id
        )
      } else if (ability === "play-from-deck") {
        this.cards_pool = this.gameObj.deck.filter(
          card => card.color === "Bronze" && card.id !== this.selected_card.id
        )
      } else if (ability === "play-from-grave") {
        this.cards_pool = this.gameObj.grave.filter(
          card =>
            (card.color === "Bronze" || card.color === "Silver") &&
            card.id !== this.selected_card.id
        )
      } else if (ability === "discard-draw-2") {
        this.cards_pool = this.gameObj.hand.filter(
          card => card.id !== this.selected_card.id
        )
      }
      this.ability = this.selected_card.ability.name
      if (this.cards_pool.length) this.show_pick_a_card_selection = true
    },

    confirm_selection(card) {
      if (this.ability === "resurrect") {
        card.charges = 1
        this.gameObj.hand.unshift(card) // временно unshift, потому что float-right
        this.gameObj.grave.splice(this.gameObj.grave.indexOf(card), 1)
      } else if (this.ability === "give-charges-to-card-in-hand-1") {
        card.charges += 1
      } else if (this.ability === "discard-draw-2") {
        this.gameObj.grave.push(card)
        this.gameObj.hand.splice(this.gameObj.hand.indexOf(card), 1)
        if (this.calc_can_draw()) this.draw_one_card()
        if (this.calc_can_draw()) this.draw_one_card()
      } else if (
        this.ability === "play-from-deck" ||
        this.ability === "play-from-grave"
      ) {
        // Показать эту выбранную для игры карту. А снимаем этот ФЛАГ уже в самом GamePage!
        this.show_picked_card = true
        this.selected_card = card // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ КАРТУ ИЗ РУКИ НА КОТОРУЮ ТКНУЛИ
        this.isActive.player_cards = true
        this.isActive.player_leader = false // а лидер теперь неактивен
        this.setActive() // поле и лидер врагов теперь активны
      }

      this.show_pick_a_card_selection = false
      this.ability = ""
      this.cards_pool = []
    },
  },
}
