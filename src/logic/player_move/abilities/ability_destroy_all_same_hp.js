import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { sound_destroy_enemy } from "@/logic/play_sounds"
import { enemy_takes_damage } from "@/logic/player_move/abilities/enemy_takes_damage"

function destroy_all_same_hp(enemy, gameObj) {
  const { field, enemy_leader } = gameObj

  let all_enemies = get_all_enemies(field, enemy_leader)
  let targets = all_enemies.filter(e => e.hp === enemy.hp)

  sound_destroy_enemy()
  targets.forEach(e => {
    enemy_takes_damage(e, { damage: e.hp }, gameObj, 1000)
  })
}

export { destroy_all_same_hp }
