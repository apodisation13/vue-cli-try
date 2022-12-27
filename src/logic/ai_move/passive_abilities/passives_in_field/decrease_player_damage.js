import { sound_enemy_decrease_player_damage } from "@/logic/play_sounds"
import { choice } from "@/lib/utils"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"

function decrease_player_damage(enemy, hand) {
  let random = choice(hand)
  timeoutAnimationValue(
    hand[random],
    "damage",
    `${hand[random].damage}-${enemy.value}`,
    enemy.value * -1,
    sound_enemy_decrease_player_damage,
    750
  )
  timeoutAnimationFlag(enemy, "damages_player")
}

export { decrease_player_damage }
