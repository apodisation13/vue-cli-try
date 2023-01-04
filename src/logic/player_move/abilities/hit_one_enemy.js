import { sound_hit_shield } from "@/logic/play_sounds"
import { enemy_takes_damage } from "@/logic/player_move/abilities/enemy_takes_damage"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

function hit_one_enemy(enemy, card, gameObj, timeout = 1000) {
  timeoutAnimationFlag(card, "damages_enemy")

  if (enemy.shield) {
    enemy.shield = false
    sound_hit_shield()
    card.damages_enemy = false
    return
  }

  enemy_takes_damage(enemy, card, gameObj, timeout)
}

export { hit_one_enemy }
