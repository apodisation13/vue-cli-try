export default {
  data() {
    return {
      grave_filtered: [],  // кладбище, но отфильтрованное, логикой ResurrectModal
      show_resurrect_modal: false,  // показать ResurrectModal, по card.ability.name==resurrect
      hand_filtered: [],   // рука, отфильтрованная для HandSpecialCaseAbilities
      show_hand_special_case_abilities: false,  // показать HandSpecialCaseAbilities
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
      if (this.hand[this.player_card_number].ability.name === 'resurrect') {
        // откр окно с grave, приходит confirm_card_from_grave()
        this.grave_filtered = this.grave.filter(card => card.type==="Unit")  // берем только Юнит
        if (this.grave_filtered.length) this.show_resurrect_modal = true
      }

      else if (this.hand[this.player_card_number].ability.name === 'draw-one-card') {
        if (this.deck.length !== 0) this.draw_one_card()
      }

      else if (this.hand[this.player_card_number].ability.name === 'give-charges-to-card-in-hand-1') {
        this.hand_filtered = this.hand.filter(card => card.color==="Bronze" && card.id !== this.hand[this.player_card_number].id)
        if (this.hand_filtered.length) this.show_hand_special_case_abilities = true
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

  },
}