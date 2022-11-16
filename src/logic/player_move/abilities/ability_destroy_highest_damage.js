import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { sound_destroy_enemy } from "@/logic/play_sounds"
import { enemy_takes_damage } from "@/logic/player_move/abilities/enemy_takes_damage"

function destroy_highest_damage(gameObj) {
  const { field, enemy_leader } = gameObj

  let all_enemies
  if (enemy_leader.damage_per_turn && enemy_leader.hp > 0) {
    all_enemies = get_all_enemies(field, {
      hp: enemy_leader.hp,
      damage: enemy_leader.damage_per_turn,
    })
  } else all_enemies = get_all_enemies(field, { hp: 0 })

  if (!all_enemies.length) return

  all_enemies.sort((a, b) => b.damage - a.damage)
  let target = all_enemies[0]

  sound_destroy_enemy()
  enemy_takes_damage(target, { damage: target.hp }, gameObj, 1000)
}

export { destroy_highest_damage }
