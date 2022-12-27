import { sound_passive_increase_damage } from "@/logic/play_sounds"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"

function incr_self_dmg(enemy) {
  timeoutAnimationFlag(enemy, "incr_dmg")
  timeoutAnimationValue(
    enemy,
    "damage",
    `${enemy.damage}+${enemy.value}`,
    enemy.value,
    sound_passive_increase_damage
  )
}

export { incr_self_dmg }
