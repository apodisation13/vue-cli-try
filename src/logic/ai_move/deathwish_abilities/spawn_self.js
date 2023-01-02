import { choice, copyObj } from "@/lib/utils"
import { get_empty_field_indexes } from "@/logic/player_move/service/service_for_player_move"
import { sound_deathwish } from "@/logic/play_sounds"
import { get_default_enemy } from "@/logic/ai_move/service/service_for_ai_move"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

// создает на поле deathwish_value копий убитого врага без deathwish в случайных свободных клетках
export function spawn_self(enemy, gameObj) {
  const defaultEnemy = get_default_enemy(enemy)
  if (!defaultEnemy) return

  sound_deathwish()
  const { field } = gameObj

  for (let i = 0; i < enemy.deathwish_value; i++) {
    const emptyField = get_empty_field_indexes(field)
    const randomIndex = choice(emptyField)
    field[emptyField[randomIndex]] = copyObj(defaultEnemy)
  }
}

// создает в колоде врагов deathwish_value копий убитого врага без deathwish
export function spawn_self_at_deck(enemy, gameObj) {
  const defaultEnemy = get_default_enemy(enemy)
  if (!defaultEnemy) return

  sound_deathwish()
  const { enemies } = gameObj

  for (let i = 0; i < enemy.deathwish_value; i++) {
    enemies.push(copyObj(defaultEnemy))
  }
  timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
}

// создает в сбросе врагов deathwish_value копий убитого врага без deathwish
export function spawn_self_at_grave(enemy, gameObj) {
  const defaultEnemy = get_default_enemy(enemy)
  if (!defaultEnemy) return

  sound_deathwish()
  const { enemies_grave } = gameObj

  for (let i = 0; i < enemy.deathwish_value; i++) {
    enemies_grave.push(copyObj(defaultEnemy))
  }
  timeoutAnimationFlag(enemies_grave[0], "trigger_grave_passive")
}
