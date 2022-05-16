export default {
  data() {
    return {
      ability: '',  // параметр для выхода из эмита
      cards_pool: [],  // список карт, которые будем показывать в окне
      show_pick_a_card_selection: false,  // показать ли окно
      show_picked_card: false,  // показать ли выбранную карту из абилок play_from_
    }
  },
  methods: {
    f() {
      alert(this.can_draw)
      this.show()
      alert(this.s+333)
    },

    // !!!МЕНЕДЖЕР особых абилок, которые требуют каких-либо окон!!!
    special_case_abilities() {
      if (this.selected_card.ability.name === 'resurrect') {
        this.ability = 'resurrect'
        this.cards_pool = this.grave.filter(card => card.type==="Unit" && card.id !== this.selected_card.id)
        if (this.cards_pool.length) this.show_pick_a_card_selection = true
      }

      else if (this.selected_card.ability.name === 'draw-two-cards') {
        if (this.deck.length !== 0 && this.hand.length < 6) this.draw_one_card()
        if (this.deck.length !== 0 && this.hand.length < 6) this.draw_one_card()
      }

      else if (this.selected_card.ability.name === 'give-charges-to-card-in-hand-1') {
        this.ability = "give-charges-to-card-in-hand-1"
        this.cards_pool = this.hand.filter(
          card => card.color==="Bronze" && card.id !== this.selected_card.id
        )
        if (this.cards_pool.length) this.show_pick_a_card_selection = true
      }

      else if (this.selected_card.ability.name === 'play-from-deck') {
        this.ability = 'play-from-deck'
        this.cards_pool = this.deck.filter(
          card => card.color==="Bronze" && card.id !== this.selected_card.id
        )
        if (this.cards_pool.length) this.show_pick_a_card_selection = true
      }

      else if (this.selected_card.ability.name === 'play-from-grave') {
        this.ability = 'play-from-grave'
        this.cards_pool = this.grave.filter(
          card => (card.color==="Bronze" || card.color==="Silver") && card.id !== this.selected_card.id
        )
        if (this.cards_pool.length) this.show_pick_a_card_selection = true
      }

      else if (this.selected_card.ability.name === 'discard-draw-2') {
        this.ability = "discard-draw-2"
        this.cards_pool = this.hand.filter(card => card.id !== this.selected_card.id)
        if (this.cards_pool.length) this.show_pick_a_card_selection = true
      }

    },

    confirm_selection(card) {
      if (this.ability === 'resurrect') {
        card.charges = 1
        this.hand.unshift(card)  // временно unshift, потому что float-right
        this.grave.splice(this.grave.indexOf(card), 1)
      }

      else if (this.ability === 'give-charges-to-card-in-hand-1') {
        card.charges += 1
      }

      else if (this.ability === 'discard-draw-2') {
        this.grave.push(card)
        this.hand.splice(this.hand.indexOf(card), 1)
        if (this.deck.length !== 0 && this.hand.length < 6) this.draw_one_card()
        if (this.deck.length !== 0 && this.hand.length < 6) this.draw_one_card()
      }

      else if (this.ability === 'play-from-deck' || this.ability === 'play-from-grave') {
        this.show_picked_card = true  // показать эту выбранную для игры карту
        // снимаем этот ФЛАГ уже в самом GamePage!

        this.selected_card = card  // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ КАРТУ ИЗ РУКИ НА КОТОРУЮ ТКНУЛИ
        alert('УРОН ' + this.selected_card.damage + '  заряды ' + this.selected_card.charges)

        this.player_cards_active = true
        this.ai_cards_active = true  // только теперь можно тыкать на карты противника!!!!!!!!!!!!!!
        this.enemy_leader_active = true  // и лидер врагов активен тоже
        this.leader_active = false // а лидер теперь неактивен
      }

      this.show_pick_a_card_selection = false
      this.ability = ''
    },


  },
}