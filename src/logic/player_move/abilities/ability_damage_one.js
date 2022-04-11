import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move"
import {sound_damage_one} from "@/logic/play_sounds"


function damage_one(enemy, card) {
  // нанесли урон и-тому элементу от конкретной карты
  hit_one_enemy(enemy, card)
  sound_damage_one()
}

export { damage_one }