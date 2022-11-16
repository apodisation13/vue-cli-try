import { sound_destroy_enemy } from "@/logic/play_sounds"
import { get_random_enemy } from "@/logic/player_move/service/service_for_player_move"
import { enemy_takes_damage } from "@/logic/player_move/abilities/enemy_takes_damage"

function destroy_random(gameObj) {
  const { field, enemy_leader } = gameObj

  let target = get_random_enemy(field, enemy_leader)

  sound_destroy_enemy()
  enemy_takes_damage(target, { damage: target.hp }, gameObj, 1000)
}

export { destroy_random }
