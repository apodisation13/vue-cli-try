export default {
  data() {
    return {
      grave_filtered: [],  // кладбище, но отфильтрованное, логикой ResurrectModal
      show_resurrect_modal: false,  // показать ResurrectModal, по card.ability.name==resurrect

      hand_filtered: [],   // рука, отфильтрованная для HandSpecialCaseAbilities
      show_hand_special_case_abilities: false,  // показать HandSpecialCaseAbilities

      deck_filtered: [],  // колода, отфильтрованная, для PlayFromDeck
      show_play_from_deck: false,  // показать PlayFromDeck, по card.ability.name===play-from-deck
      show_card_from_deck: false,  // показывать ли саму карту, выбранную из деки

    }
  },
  methods: {
    f() {
      alert(this.can_draw)
      this.show()
      alert(this.s+333)
    },

    // особые абилки, которые требуют каких-либо окон
    special_case_abilities() {
      if (this.selected_card.ability.name === 'resurrect') {
        // откр окно с grave, приходит confirm_card_from_grave()
        this.grave_filtered = this.grave.filter(card => card.type==="Unit")  // берем только Юнит
        if (this.grave_filtered.length) this.show_resurrect_modal = true
      }

      else if (this.selected_card.ability.name === 'draw-one-card') {
        if (this.deck.length !== 0) this.draw_one_card()
      }

      else if (this.selected_card.ability.name === 'give-charges-to-card-in-hand-1') {
        this.hand_filtered = this.hand.filter(card => card.color==="Bronze" && card.id !== this.selected_card.id)
        if (this.hand_filtered.length) this.show_hand_special_case_abilities = true
      }

      else if (this.selected_card.ability.name === 'play-from-deck') {
        this.deck_filtered = this.deck.filter(card => card.color==="Bronze" && card.id !== this.selected_card.id)
        if (this.deck_filtered.length) this.show_play_from_deck = true
      }

    },

    // восстановление карты из кладбища в руку по абилке resurrect
    confirm_card_from_grave(card) {
      card.charges = 1
      this.hand.push(card)
      let chosen_card = this.grave.filter(c => c===card)[0]  // ведь формально это Array
      this.grave.splice(this.grave.indexOf(chosen_card), 1)
      this.show_resurrect_modal = false
    },

    // дать карте в руке 1 заряд по абилке give-charges-to-card-in-hand-1
    give_charges_to_card_in_hand(card) {
      let chosen_card = this.hand.filter(c => c===card)[0]  // ведь формально это Array
      chosen_card.charges += 1
      this.show_hand_special_case_abilities = false
    },

    chosen_card_from_deck(card) {
      this.show_play_from_deck = false
      this.show_card_from_deck = true
      this.selected_card = card  // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ КАРТУ ИЗ РУКИ НА КОТОРУЮ ТКНУЛИ
      alert('УРОН ' + this.selected_card.damage + '  заряды ' + this.selected_card.charges)
      this.player_cards_active = true
      this.ai_cards_active = true  // только теперь можно тыкать на карты противника!!!!!!!!!!!!!!
      this.enemy_leader_active = true  // и лидер врагов активен тоже
      this.leader_active = false // а лидер теперь неактивен
    }

  },
}