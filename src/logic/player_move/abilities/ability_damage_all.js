import { sound_damage_all } from "@/logic/play_sounds"
import { hit_one_enemy } from "@/logic/player_move/abilities/hit_one_enemy"

function damage_all(field, card, gameObj) {
  field.forEach(enemy => {
    if (enemy) hit_one_enemy(enemy, card, gameObj)
  })
  sound_damage_all()
}

export { damage_all }
