import { sound_enemy_regain_shield } from "@/logic/play_sounds"
import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { choice_element } from "@/lib/utils"

function regain_shield(enemy) {
  if (!enemy.shield) {
    enemy.shield = true
    sound_enemy_regain_shield()
  }
}

function give_shield(field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)
  const random_enemy = choice_element(all_enemies)
  if (!random_enemy.shield) {
    random_enemy.shield = true
    sound_enemy_regain_shield()
  }
}

export { regain_shield, give_shield }
