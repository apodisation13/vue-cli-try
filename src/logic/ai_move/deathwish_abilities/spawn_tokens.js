import { get_empty_field_indexes } from "@/logic/player_move/service/service_for_player_move"
import { copyObj } from "@/lib/utils"
import { sound_deathwish } from "@/logic/play_sounds"
import { get_default_enemy } from "@/logic/ai_move/service/service_for_ai_move"

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
