import { get_empty_field_indexes } from "@/logic/player_move/service/service_for_player_move"
import { copyObj } from "@/lib/utils"
import { sound_deathwish } from "@/logic/play_sounds"
import { get_default_enemy } from "@/logic/ai_move/service/service_for_ai_move"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

// создает в каждой свободной клетке токен данного врага без deathwish
export function spawn_tokens(enemy, gameObj) {
  const defaultEnemy = get_default_enemy(enemy)
  if (!defaultEnemy) return
  defaultEnemy.hp = 1
  defaultEnemy.damage = 1

  sound_deathwish()

  const { field } = gameObj

  const emptyField = get_empty_field_indexes(field)
  emptyField.forEach(index => {
    field[index] = copyObj(defaultEnemy)
  })
}

export function spawn_tokens_at_deck(enemy, gameObj) {
  const defaultEnemy = get_default_enemy(enemy)
  if (!defaultEnemy) return
  defaultEnemy.hp = 1
  defaultEnemy.damage = 1

  sound_deathwish()

  const { enemies } = gameObj

  for (let i = 0; i < enemy.deathwish_value; i++) {
    enemies.push(copyObj(defaultEnemy))
  }
  timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
}
