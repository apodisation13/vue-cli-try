import store from "@/store"
import { choice, copyObj } from "@/lib/utils"
import { get_empty_field_indexes } from "@/logic/player_move/service/service_for_player_move"

export function spawn_self(enemy, field) {
  const defaultEnemy = copyObj(
    store.getters["all_enemies"].find(e => e.id === enemy.id)
  )
  if (!defaultEnemy) return
  defaultEnemy.has_deathwish = false

  const emptyField = get_empty_field_indexes(field)
  const randomIndex = choice(emptyField)

  field[emptyField[randomIndex]] = defaultEnemy
}
