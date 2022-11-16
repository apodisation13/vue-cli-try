import { sound_damage_one } from "@/logic/play_sounds"
import { hit_one_enemy } from "@/logic/player_move/abilities/hit_one_enemy"

function damage_one(enemy, card, gameObj) {
  // нанесли урон и-тому элементу от конкретной карты
  hit_one_enemy(enemy, card, gameObj)
  sound_damage_one()
}

export { damage_one }
