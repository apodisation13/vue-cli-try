import {sound_damage_row} from "@/logic/play_sounds"
import {hit_one_enemy} from "@/logic/player_move/abilities/hit_one_enemy"


function damage_row(enemy, card, field, enemy_leader, enemies) {
  let index = field.indexOf(enemy)
  let min = Math.floor(index / 3) * 3
  let max = min + 3

  sound_damage_row()
  field.slice(min, max).forEach(enemy => {
    if (enemy) hit_one_enemy(enemy, card, field, enemy_leader, enemies)
  })
}


export { damage_row }