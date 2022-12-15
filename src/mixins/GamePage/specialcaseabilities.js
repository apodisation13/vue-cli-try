import { choice_element } from "@/lib/utils"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

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
        // берем из кладбища только юнитов (кроме себя, потому что сама она тоже ушла в кладбище уже)
        this.cards_pool = this.gameObj.grave.filter(
          card => card.type === "Unit" && card.id !== this.selected_card.id
        )
      } else if (ability === "draw-two-cards") {
        this.draw_one_card()
      } else if (ability === "give-charges-to-card-in-hand-1") {
        // прибавляем 1 заряд бронзовой карте в руке
        this.cards_pool = this.gameObj.hand.filter(
          card => card.color === "Bronze" && card.id !== this.selected_card.id
        )
      } else if (ability === "play-from-deck") {
        // играем бронзовую карту из колоды
        this.cards_pool = this.gameObj.deck.filter(
          card => card.color === "Bronze" && card.id !== this.selected_card.id
        )
      } else if (ability === "play-from-grave") {
        // играем из кладбища бронзовую или серебряную карту
        this.cards_pool = this.gameObj.grave.filter(
          card =>
            (card.color === "Bronze" || card.color === "Silver") &&
            card.id !== this.selected_card.id
        )
      } else if (ability === "discard-draw-2") {
        // тут мы 1 карту сбросим, 2 возьмем
        this.cards_pool = this.gameObj.hand.filter(
          card => card.id !== this.selected_card.id
        )
      } else if (ability === "play-from-deck-2") {
        // играем бронзовую или серебряную карту из колоды
        this.cards_pool = this.gameObj.deck.filter(
          card => card.color === "Bronze" || card.color === "Silver"
        )
      } else if (ability === "incr-dmg-to-hand-by-self-dmg") {
        // выбираем карту из руки, увеличиваем её урон на значение урона той карты, которую мы играли
        this.special_case_value = this.selected_card.damage // сохранили значение урона
        this.cards_pool = this.gameObj.hand.filter(
          card => card.id !== this.selected_card.id
        )
      } else if (ability === "play-enemy-from-grave") {
        // играем бронзового ВРАГА из их кладбища (нужен костыль чтобы абилку им прописать)
        this.cards_pool = this.gameObj.enemies_grave.filter(
          e => e.color === "Bronze"
        )
        this.forEnemy()
      } else if (ability === "play-special-from-deck") {
        // играем любую специальную карту из колоды
        this.cards_pool = this.gameObj.deck.filter(
          card => card.type === "Special"
        )
      } else if (ability === "play-special-from-grave") {
        // играем любую специальную карту из сброса
        this.cards_pool = this.gameObj.grave.filter(
          card => card.type === "Special"
        )
      } else if (ability === "move-enemy-from-deck-to-grave") {
        // выбираем врага из их колоды и перемещаем его в их сброс (+костыль на врагов)
        this.cards_pool = this.gameObj.enemies
        this.forEnemy()
      } else if (ability === "decr-dmg-to-hand-incr-to-random-hand") {
        // выбираем карту, уменьшаем ее урон на value, прибавляем value урона рандомной карте в руке
        this.special_case_value = this.selected_card.value // сохранили значение урона
        this.cards_pool = this.gameObj.hand.filter(
          card => card.id !== this.selected_card.id
        )
      } else if (ability === "incr-dmg-by-n-charges") {
        // увеличиваем урон карты в руке на количество зарядов у той
        this.cards_pool = this.gameObj.hand
      } else if (ability === "create-special") {
        // вот это сложно... выбираем 3 случайные бронзовые спец карты НЕ из фракции
        for (let i = 0; i < 3; i++) {
          const pool = this.$store.getters["all_cards"].filter(
            c =>
              c.card.faction !== this.gameObj.leader.faction &&
              c.card.type === "Special" &&
              c.card.color === "Bronze"
          )
          const r = choice_element(pool)
          this.cards_pool.push(r.card)
        }
      } else if (ability === "create-any-unit") {
        // выбираем 3 случайных ЮНИТА из всех карт этой фракции
        for (let i = 0; i < 3; i++) {
          const pool = this.$store.getters["all_cards"].filter(
            c =>
              c.card.faction === this.gameObj.leader.faction &&
              c.card.type === "Unit"
          )
          const r = choice_element(pool)
          this.cards_pool.push(r.card)
        }
      } else if (ability === "create-and-put-to-deck") {
        // выбираем 3 случайных ЮНИТА из всех карт вообще и кладем его в КОЛОДУ
        for (let i = 0; i < 3; i++) {
          const pool = this.$store.getters["all_cards"].filter(
            c => c.card.type === "Unit"
          )
          const r = choice_element(pool)
          this.cards_pool.push(r.card)
        }
      } else if (ability === "draw-exact") {
        // берем из колоды ЛЮБУЮ КАРТУ!
        if (this.calc_can_draw()) this.cards_pool = this.gameObj.deck
      }
      this.ability = this.selected_card.ability.name
      if (this.cards_pool.length) this.show_pick_a_card_selection = true
    },

    // А ЭТО МЕНЕДЖЕР абилок той карты, которую мы выбрали из открывшегося окна!
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
        this.ability === "play-special-from-grave" ||
        this.ability === "create-special" ||
        this.ability === "create-any-unit"
      ) {
        if (
          this.ability === "play-from-grave" ||
          this.ability === "play-special-from-grave"
        ) {
          card.charges = 1
        }

        // Показать эту выбранную для игры карту. А снимаем этот ФЛАГ уже в самом GamePage!
        this.show_picked_card = true
        this.selected_card = card // ВОТ ЗДЕСЬ МЫ ЗАПОМНИЛИ ЭТУ КАРТУ НА КОТОРУЮ ТКНУЛИ ИЗ ОКНА
        this.isActive.player_cards = true
        this.isActive.player_leader = false // а лидер теперь неактивен
        this.setActive() // поле и лидер врагов теперь активны
      } else if (this.ability === "incr-dmg-to-hand-by-self-dmg") {
        card.damage += this.special_case_value
        this.incrDmg(card)
      } else if (this.ability === "move-enemy-from-deck-to-grave") {
        const cd = this.gameObj.enemies.findIndex(c => c.id === card.id)
        this.gameObj.enemies.splice(cd, 1)
        card.hp = card.base_hp
        this.gameObj.enemies_grave.push(card)
      } else if (this.ability === "decr-dmg-to-hand-incr-to-random-hand") {
        card.damage -= this.special_case_value
        if (card.damage < 0) card.damage = 0
        const random_card = choice_element(this.gameObj.hand)
        random_card.damage += this.special_case_value
        this.incrDmg(random_card)
      } else if (this.ability === "incr-dmg-by-n-charges") {
        card.damage += card.charges
        this.incrDmg(card)
      } else if (this.ability === "create-and-put-to-deck") {
        this.gameObj.deck.push(card)
      } else if (this.ability === "draw-exact") {
        this.gameObj.deck.splice(card, 1)
        this.gameObj.hand.push(card)
      }

      this.show_pick_a_card_selection = false
      this.ability = ""
      this.cards_pool = []
      this.special_case_value = null
    },

    // если мы играем ВРАГА, у него нет абилки никакой, эта функция добавит ему базовую абилку на урон одному
    forEnemy() {
      this.cards_pool.forEach(card => {
        card["ability"] = {
          name: "damage-one",
          description: "Нанести {damage} урона одному врагу",
        }
        card["charges"] = 1
      })
    },
    // чтобы показать фиолетовую рамку для этой карты
    incrDmg(card) {
      card.incr_dmg = true
      sound_passive_increase_damage()
      setTimeout(() => {
        card.incr_dmg = false
      }, 500)
    },
  },
}
