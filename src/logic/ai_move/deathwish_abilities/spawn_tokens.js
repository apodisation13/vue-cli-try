import store from "@/store"
import { get_empty_field_indexes } from "@/logic/player_move/service/service_for_player_move"
import { copyObj } from "@/lib/utils"
import { sound_deathwish } from "@/logic/play_sounds"

export function spawn_tokens(enemy, field) {
  const defaultEnemy = copyObj(
    store.getters["all_enemies"].find(e => e.id === enemy.id)
  )
  if (!defaultEnemy) return

  sound_deathwish()

  defaultEnemy.has_deathwish = false
  defaultEnemy.hp = 1
  defaultEnemy.damage = 1

  const emptyField = get_empty_field_indexes(field)
  emptyField.forEach(index => {
    field[index] = copyObj(defaultEnemy)
  })
}
