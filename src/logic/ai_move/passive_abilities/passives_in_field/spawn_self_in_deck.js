import store from "@/store"
import { choice, choice_element, copyObj } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"
import { get_empty_field_indexes } from "@/logic/player_move/service/service_for_player_move"
import {
  create_token,
  create_token_with_passive,
} from "@/logic/ai_move/service/service_for_ai_move"
import { sound_appear_new_enemy } from "@/logic/play_sounds"

export function spawn_self_in_deck(enemy, gameObj) {
  const { enemies } = gameObj
  const self = copyObj(enemy)
  self.passive_ability = null
  self.has_passive = null
  self.has_passive_in_field = null
  timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
  enemies.push(copyObj(self))
}

// создает в колоде врагов value количество токенов этого врага, снимает у тех пассивные способности
export function spawn_tokens_in_deck(enemy, gameObj) {
  const { enemies } = gameObj
  const token = create_token(enemy)
  for (let i = 0; i < enemy.value; i++) {
    enemies.push(copyObj(token))
  }
  timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
}

// создаёт токен этого врага, снимает у того пассивную способность и помещает его на случайную свободную клетку
export function spawn_token(enemy, field) {
  const token = create_token(enemy)
  const emptyField = get_empty_field_indexes(field)
  const randomIndex = choice(emptyField)
  field[emptyField[randomIndex]] = copyObj(token)
  sound_appear_new_enemy()
}

// создает токен РАНДОМНОЙ КАРТЫ ЭТОЙ ФРАКЦИИ и помещает его на случайную свободную клетку
export function spawn_random_token(gameObj) {
  const { field, enemy_leader } = gameObj
  const random_enemy = choice_element(
    store.getters.all_enemies.filter(e => e.faction === enemy_leader.faction)
  )
  const token = create_token_with_passive(random_enemy)
  const emptyField = get_empty_field_indexes(field)
  const randomIndex = choice(emptyField)
  field[emptyField[randomIndex]] = copyObj(token)
  sound_appear_new_enemy()
}
