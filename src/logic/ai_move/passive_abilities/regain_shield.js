import { sound_enemy_regain_shield } from "@/logic/play_sounds"

function passive_end_turn_regain_shield(enemy) {
  if (!enemy.shield) {
    enemy.shield = true
    sound_enemy_regain_shield()
  }
}

export { passive_end_turn_regain_shield }
