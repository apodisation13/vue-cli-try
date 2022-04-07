import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move";


function damage_row(enemy, card, field) {
  let index = field.indexOf(enemy)
  let min = Math.floor(index / 3) * 3
  let max = min + 3

  field.slice(min, max).forEach(enemy => {
    if (enemy) {
      hit_one_enemy(enemy, card)
    }
  })
}


export { damage_row }