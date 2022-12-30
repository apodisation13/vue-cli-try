import { copyObj } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function spawn_self_in_deck(enemy, gameObj) {
  const { enemies } = gameObj

  const self = copyObj(enemy)
  self.passive_ability = null
  self.has_passive = null
  self.has_passive_in_field = null
  timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
  enemies.push(copyObj(self))
}

export function spawn_tokens_in_deck(enemy, gameObj) {
  const { enemies } = gameObj

  const self = copyObj(enemy)
  self.passive_ability = null
  self.has_passive = null
  self.has_passive_in_field = null
  self.hp = 1
  self.base_hp = 1
  self.damage = 1

  for (let i = 0; i < enemy.value; i++) {
    enemies.push(copyObj(self))
  }
  timeoutAnimationFlag(enemies[0], "trigger_deck_passive")
}
