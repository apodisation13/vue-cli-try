import { player_passive_abilities_end_turn } from "@/logic/player_move/player_passive_abilities"
import { ai_move } from "@/logic/ai_move/ai_move"
import {
  enemy_passive_abilities_end_turn,
  passive_leader_ai_move,
} from "@/logic/ai_move/ai_passive_abilties"
import { appear_new_enemy } from "@/logic/game_logic/place_enemies"

export default {
  methods: {
    // нажал ПАС - переход хода компу
    exec_ai_move() {
      this.$store.commit("set_player_turn", false) // кнопка пас сразу пропала и дро тоже

      // А ДАЛЬШЕ последовательно выполняются
      // - пассивки карт игрока
      // - ход компа
      // - пассивка лидера врагов
      // - пассивки самих врагов
      // - появление нового врага
      // - переход хода снова игроку

      player_passive_abilities_end_turn(this.gameObj)

      let await_ppa_end_turn = setInterval(() => {
        if (!this.$store.state.game.ppa_end_turn) {
          console.log("закончили ppa_end_turn, начинает ходить комп")
          clearInterval(await_ppa_end_turn)
          ai_move(this.gameObj.field)

          let await_ai_move = setInterval(() => {
            if (!this.$store.state.game.ai_move) {
              console.log("закончили ходить комп, ходит лидер врагов")
              clearInterval(await_ai_move)
              passive_leader_ai_move(this.gameObj.enemy_leader)

              let await_leader_ai_passive_move = setInterval(() => {
                if (!this.$store.state.game.leader_ai_move) {
                  console.log("закончили лидер врагов, теперь пассивки врагов")
                  clearInterval(await_leader_ai_passive_move)
                  enemy_passive_abilities_end_turn(
                    this.gameObj.field,
                    this.gameObj.enemy_leader,
                    this.gameObj.hand
                  )

                  let await_epa_end_turn = setInterval(() => {
                    if (!this.$store.state.game.epa_end_turn) {
                      console.log(
                        "всё закончили, щас появится новый враг и можно ходить снова"
                      )
                      clearInterval(await_epa_end_turn)
                      appear_new_enemy(this.gameObj.field, this.gameObj.enemies)
                      this.isActive.player_cards = true
                      this.can_draw = this.calc_can_draw()
                      this.$store.commit("set_player_turn", true)
                    }
                  }, 500)
                }
              }, 500)
            }
          }, 500)
        }
      }, 500)
    },
  },
}
