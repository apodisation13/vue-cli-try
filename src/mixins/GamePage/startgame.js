import { place_enemies } from "@/logic/game_logic/place_enemies"
import { enemy_leader_ai_move_once } from "@/logic/ai_move/ai_move"
import { draw_hand } from "@/logic/game_logic/draw_hand"

export default {
  methods: {
    // НАЧАЛО ИГРЫ: копируем лидера, лидера врагов, врагов, колоду
    // расставляем врагов, пассивка лидера врагов по началу, тянем руку и показываем окно редро
    start_game() {
      // оставили только card, нам уже не нужны id записей UserCard
      let deck = this.$store.state.game.current_deck.map(c => c.card)
      this.gameObj.deck = JSON.parse(JSON.stringify(deck))

      this.gameObj.leader = JSON.parse(
        JSON.stringify(this.$store.state.game.leader)
      )
      this.gameObj.enemy_leader = JSON.parse(
        JSON.stringify(this.$store.state.game.enemy_leader)
      )
      this.gameObj.enemies = JSON.parse(
        JSON.stringify(this.$store.state.game.level.enemies)
      )

      // рандомно расставит врагов по полю, изменяет поле и врагов
      place_enemies(this.gameObj.field, this.gameObj.enemies)
      // АБИЛКИ ЛИДЕРА врага в самом начале
      enemy_leader_ai_move_once(this.gameObj)
      // вытянет руку, остальное оставит в деке, изменяет руку и деку
      draw_hand(this.gameObj.hand, this.gameObj.deck)

      this.draw = true // показать окно редро
    },
  },
}
