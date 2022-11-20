import { choice_pop } from "@/lib/utils"

export default {
  data() {
    return {
      can_draw: false, // возможность вытянуть карту
      draw: false, // показать ли модальное окно с редро
    }
  },
  methods: {
    // можно ли ДРО - ход игрока, карт меньше чем {карт_в_руке}, дека не пуста
    calc_can_draw() {
      return (
        // this.player_cards_active &&
        this.gameObj.hand.length < this.$store.state.game.hand_size &&
        this.gameObj.deck.length !== 0
      )
    },

    // тянем одну карту из деки, блокируем карты игрока чтобы ходить было нельзя
    draw_one_card() {
      this.draw = true // показать окно редро
      let card = choice_pop(this.gameObj.deck)
      this.gameObj.hand.push(card) // FIXME: добавить в список на 1е место )))) потому что там в руке float:right
      this.isActive.player_cards = false
      this.can_draw = false
    },

    redraw_finished(dict) {
      this.draw = false // закрыть модальное окно с редро
      this.gameObj.hand = dict.hand
      this.gameObj.deck = dict.deck
    },
  },
}
