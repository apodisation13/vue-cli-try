import { sound_damage_row } from "@/logic/play_sounds"
import { hit_one_enemy } from "@/logic/player_move/abilities/hit_one_enemy"

function damage_row(enemy, card, gameObj) {
  const { field } = gameObj
  let index = field.indexOf(enemy)
  let min = Math.floor(index / 3) * 3
  let max = min + 3

  sound_damage_row()
  field.slice(min, max).forEach(enemy => {
    if (enemy) hit_one_enemy(enemy, card, gameObj)
  })
}

export { damage_row }
