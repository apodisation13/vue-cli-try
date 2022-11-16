import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { sound_destroy_enemy } from "@/logic/play_sounds"
import { enemy_takes_damage } from "@/logic/player_move/abilities/enemy_takes_damage"

function destroy_highest_hp(gameObj) {
  const { field, enemy_leader } = gameObj

  let all_enemies = get_all_enemies(field, enemy_leader)
  all_enemies.sort((a, b) => b.hp - a.hp)
  let target = all_enemies[0]

  sound_destroy_enemy()
  enemy_takes_damage(target, { damage: target.hp }, gameObj, 1000)
}

export { destroy_highest_hp }
