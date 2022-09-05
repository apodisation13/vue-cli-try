import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { sound_destroy_enemy } from "@/logic/play_sounds"
import { check_win } from "@/logic/player_move/service/check_win"

function destroy_all_same_hp(enemy, field, enemy_leader, enemies) {
  let all_enemies = get_all_enemies(field, enemy_leader)
  let targets = all_enemies.filter(e => e.hp === enemy.hp)

  sound_destroy_enemy()

  targets.forEach(e => {
    e.hp = `${e.hp}-${e.hp}`
  })

  setTimeout(() => {
    targets.forEach(e => {
      e.hp = 0
      let index = field.indexOf(e)
      if (index !== -1) field[index] = ""

      check_win(field, enemies, enemy_leader)
    })
  }, 1000)
}

export { destroy_all_same_hp }
