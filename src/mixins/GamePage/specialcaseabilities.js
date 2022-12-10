import { choice } from "@/lib/utils"

export default {
  data() {
    return {
      ability: "", // параметр для выхода из эмита
      cards_pool: [], // список карт, которые будем показывать в окне
      show_pick_a_card_selection: false, // показать ли окно
      show_picked_card: false, // показать ли выбранную карту из абилок play_from_
      special_case_value: null, // сохраняем какое-то особое значения для абилок
    }
  },
  methods: {
    // !!!МЕНЕДЖЕР особых абилок, которые требуют каких-либо окон!!!
    special_case_abilities() {
      // в этой функции мы подготавливаем cards_pool - список карт, которые будут в открывшемся окне
      // ещё мы запоминаем способность (ability) и если есть то значение (speical_case_value)
      // сам выбор карты - в следующей функции
      const ability = this.selected_card.ability.name

      if (ability === "resurrect") {
        this.cards_pool = this.gameObj.grave.filter(
          card => card.type === "Unit" && card.id !== this.selected_card.id
        )
      } else if (ability === "draw-two-cards") {
        this.draw_one_card()
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
      } else if (ability === "play-from-deck-2") {
        this.cards_pool = this.gameObj.deck.filter(
          card => card.color === "Bronze" || card.color === "Silver"
        )
      } else if (ability === "incr-dmg-to-hand-by-self-dmg") {
        this.special_case_value = this.selected_card.damage // сохранили значение урона
        this.cards_pool = this.gameObj.hand.filter(
          card => card.id !== this.selected_card.id
        )
      } else if (ability === "play-enemy-from-grave") {
        this.cards_pool = this.gameObj.enemies_grave.filter(
          e => e.color === "Bronze"
        )
        this.forEnemy()
      } else if (ability === "play-special-from-deck") {
        this.cards_pool = this.gameObj.deck.filter(
          card => card.type === "Special"
        )
      } else if (ability === "play-special-from-grave") {
        this.cards_pool = this.gameObj.grave.filter(
          card => card.type === "Special"
        )
      } else if (ability === "move-enemy-from-deck-to-grave") {
        this.cards_pool = this.gameObj.enemies
        this.forEnemy()
      } else if (ability === "decr-dmg-to-hand-incr-to-random-hand") {
        this.special_case_value = this.selected_card.value // сохранили значение урона
        this.cards_pool = this.gameObj.hand.filter(
          card => card.id !== this.selected_card.id
        )
      }
      this.ability = this.selected_card.ability.name
      if (this.cards_pool.length) this.show_pick_a_card_selection = true
    },

    confirm_selection(card) {
      // card - это та карта, которую мы выбрали из какого-либо дополнительного окна
      if (this.ability === "resurrect") {
        card.charges = 1
        this.gameObj.hand.push(card)
        this.gameObj.grave.splice(this.gameObj.grave.indexOf(card), 1)
      } else if (this.ability === "give-charges-to-card-in-hand-1") {
        card.charges += 1
      } else if (this.ability === "discard-draw-2") {
        this.gameObj.grave.push(card)
        this.gameObj.hand.splice(this.gameObj.hand.indexOf(card), 1)
        this.draw_one_card()
      } else if (
        this.ability === "play-from-deck" ||
        this.ability === "play-from-grave" ||
        this.ability === "play-from-deck-2" ||
        this.ability === "play-enemy-from-grave" ||
        this.ability === "play-special-from-deck" ||
        this.ability === "play-special-from-grave"
      ) {
        if (
          this.ability === "play-from-grave" ||
          this.ability === "play-special-from-grave"
        ) {
          card.charges = 1
        }

        // Показать эту выбранную для игры карту. А снимаем этот ФЛАГ уже в самом GamePage!
        this.show_picked_card = true
        this.selected_card = card // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ КАРТУ ИЗ РУКИ НА КОТОРУЮ ТКНУЛИ
        this.isActive.player_cards = true
        this.isActive.player_leader = false // а лидер теперь неактивен
        this.setActive() // поле и лидер врагов теперь активны
      } else if (this.ability === "incr-dmg-to-hand-by-self-dmg") {
        card.damage += this.special_case_value
      } else if (this.ability === "move-enemy-from-deck-to-grave") {
        const cd = this.gameObj.enemies.findIndex(c => c.id === card.id)
        this.gameObj.enemies.splice(cd, 1)
        card.hp = card.base_hp
        this.gameObj.enemies_grave.push(card)
      } else if (this.ability === "decr-dmg-to-hand-incr-to-random-hand") {
        card.damage -= this.special_case_value
        if (card.damage < 0) card.damage = 0
        const random_card = this.gameObj.hand[choice(this.gameObj.hand)]
        random_card.damage += this.special_case_value
      }

      this.show_pick_a_card_selection = false
      this.ability = ""
      this.cards_pool = []
      this.special_case_value = null
    },

    forEnemy() {
      this.cards_pool.forEach(card => {
        card["ability"] = {
          name: "damage-one",
          description: "Нанести {damage} урона одному врагу",
        }
        card["charges"] = 1
      })
    },
  },
}
