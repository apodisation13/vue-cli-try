export default {
  data() {
    return {
      can_draw: false, // возможность вытянуть карту
      s: 1, // тестовая переменная, её можно дёргать отсюда, из компонента, из другого миксина!
      draw: false,
    }
  },
  methods: {
    show() {
      alert(111)
    },

    // можно ли ДРО - ход игрока, карт меньше чем {карт_в_руке}, дека не пуста
    calc_can_draw() {
      return this.player_cards_active && this.hand.length < this.$store.state.game.hand_size && this.deck.length !== 0
    },

    // тянем одну карту из деки, блокируем карты игрока
    draw_one_card() {
      this.draw = true
      let random = Math.floor(Math.random() * this.deck.length)
      this.hand.unshift(this.deck[random]) // добавить в список на 1е место )))) потому что там в руке float:right
      this.deck.splice(random, 1) // удалить этот 0й элемент
      this.player_cards_active = false
      this.can_draw = false
    },

    redraw_finished(dict) {
      this.draw = false
      this.hand = dict.hand
      this.deck = dict.deck
    },
  },
}
