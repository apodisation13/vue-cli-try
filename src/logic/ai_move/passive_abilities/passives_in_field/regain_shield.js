import { sound_enemy_regain_shield } from "@/logic/play_sounds"

function regain_shield(enemy) {
  if (!enemy.shield) {
    enemy.shield = true
    sound_enemy_regain_shield()
  }
}

export { regain_shield }
